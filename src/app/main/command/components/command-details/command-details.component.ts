import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandCrudService} from "../../service/crud/command/command-crud.service";
import {CommandRowCrudService} from "../../service/crud/commandRow/command-row-crud.service";
import {ProductCrudService} from "../../../product/service/crud/product-crud.service";
import {CommandModel} from "../../model/command.model";
import {LoginService} from "../../../../pages/login/service/login/login.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CommandRowModel} from "../../model/commandRow.model";
import {UserModel} from "../../../user/model/user.model";
import {UserCrudService} from "../../../user/service/crud/user-crud.service";

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.scss']
})
export class CommandDetailsComponent implements OnInit {

  command!: CommandModel;
  commandRows!: MatTableDataSource<CommandRowModel>;
  pageSizeOption = [5, 10, 15];
  displayedColumns: string[] = ['product', 'quantityOrdered', 'remaining', 'totalPrice'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private commandCrud: CommandCrudService,
              private commandRowCrud: CommandRowCrudService,
              private productCrud: ProductCrudService,
              private loginService: LoginService,
              private userCrud: UserCrudService) { }

  ngOnInit(): void {
    this.command = new CommandModel();
    this.command.command_by = new UserModel();
    const commandId = this.route.snapshot.params['id'];
    this.loadCommand(commandId);
    this.loadCommandRows(commandId);
  }

  // load the command to details
  loadCommand(id: string) {
    this.commandCrud.getById(id).subscribe(
      (command: CommandModel)=> {
        this.command = command;
        this.userCrud.getById(command.command_by as string).subscribe(
          (user)=> {
            this.command.command_by = user;
          }
        );
      }
    );
  }

  // load CommandRows of the command to details
  loadCommandRows(commandId: string) {
    this.commandRowCrud.getCommandRowsByCommand(commandId).subscribe(
      (commands)=> {
        console.log(commands);
        this.commandRows = new MatTableDataSource<CommandRowModel>(commands);
        this.commandRows.data.forEach(
          (row:any)=>{
            this.productCrud.getById(row.product).subscribe(
              (product)=>{
                row.product = product;
              }
            );
          }
        );
        this.commandRows.paginator = this.paginator;
      }
    );
  }

}
