import {Component, OnInit, ViewChild} from '@angular/core';
import {UserCrudService} from "../../service/crud/user-crud.service";
import {Router} from "@angular/router";
import {UserModel} from "../../model/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!: MatTableDataSource<UserModel>;
  pageSizeOption = [5, 10, 15];
  displayedColumns: string[] = ['email', 'name', 'role', 'addDate', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userCrud: UserCrudService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userCrud.getAll().subscribe(
      (users)=>{
        this.users = new MatTableDataSource<UserModel>(users);
        this.users.paginator = this.paginator;
      }
    );
  }

  onDetails(id: string) {
    this.router.navigate(['/main/user-details', id]);
  }

  onNew() {
    this.router.navigate(['/main/edit-user']);
  }

  onDelete(user: any) {
    if(confirm('Supprimer l\'utilisateur ' + user.user_name +  '?')) {
      this.userCrud.delete(user.id).subscribe(
        (user)=> {
          this.loadUsers();
        }
      );
    }
  }
}
