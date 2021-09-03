import { Component, OnInit } from '@angular/core';
import {UserCrudService} from "../../service/crud/user-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../model/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user!: UserModel;
  constructor(private userCrud: UserCrudService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = new UserModel();
    this.loadUser(this.route.snapshot.params['id']);
  }

  loadUser(id: string) {
    this.userCrud.retrieve(id).subscribe(
      (user:UserModel)=> {
        this.user = user;
      }
    );
  }

  onEdit() {
    this.router.navigate(['/main/edit-user', this.route.snapshot.params['id']]);
  }

  onBack() {
    this.router.navigate(['/main/user-list']);
  }

  getStatusColor(): string {
    return (this.user.is_active)?"green":"red"
  }

}
