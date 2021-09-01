import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CommandModel} from "../../model/command.model";
import {MatPaginator} from "@angular/material/paginator";
import {CommandCrudService} from "../../service/crud/command/command-crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class CommandListComponent implements OnInit {

  commands: MatTableDataSource<CommandModel>;
  pageSizeOption = [5, 10, 15];
  displayedColumns: string[] = ['title', 'commandDate', 'totalPrice', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private commandCrud: CommandCrudService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadCommands();
  }

  loadCommands() {
    this.commandCrud.getAll().subscribe(
      (commands: any) => {
        this.commands = new MatTableDataSource<CommandModel>(commands.results);
        this.commands.paginator = this.paginator;
        console.log(commands.results);
      }
    );
  }

  onDetails(id: string) {
    return this.router.navigate(['/main/command-details', id]);
  }

  onNew() {
    return this.router.navigate(['/main/edit-command']);
  }

}
