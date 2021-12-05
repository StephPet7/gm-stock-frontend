import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserCrudService} from "../../service/crud/user-crud.service";
import {UserModel} from "../../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userToEdit!: UserModel;
  newUser: boolean;
  userForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userCrud: UserCrudService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      user_name: ['', Validators.required],
      role: ['', Validators.required],
      is_active: [false]
    });

    this.userToEdit = new UserModel();
    this.route.params.subscribe(
      (params)=>{
        if(params.id) {
          this.newUser = false;
          this.userToEdit.id = params.id
          this.loadUserToEdit(params.id);
        }
        else {
          this.newUser = true;
        }
      }
    )
  }

  loadUserToEdit(id: string) {
    this.userCrud.retrieve(id).subscribe(
      (user: any)=>{
        console.log(user);
        this.userToEdit = user;
        this.initFormWhenUpdating();
      },
      error => {
        console.log(error);
        alert('Erreur lors du chargement des informations de l\'utilisateur');
      }
    )
  }

  initFormWhenUpdating() {
    this.userForm.get('email').setValue(this.userToEdit.email);
    this.userForm.get('user_name').setValue(this.userToEdit.user_name);
    this.userForm.get('name').setValue(this.userToEdit.name);
    this.userForm.get('role').setValue(this.userToEdit.role);
    this.userForm.get('is_active').setValue(this.userToEdit.is_active);
  }

  onCancel() {
    this.router.navigate(['/main/user-list']);
  }

  onSubmit() {
    if(this.newUser) {
      this.userCrud.create(this.userForm.value).subscribe(
        (user: any)=> {
          console.log(user);
          this.router.navigate(['/main/user-list']);
        },
        (error:any) => {
          console.log(error.error);
          alert('Echec lors de l\'enregistrement de l\'utilisateur');
        }
      );
    }
    else {
      console.log(this.userForm.value);
      this.userCrud.update(this.userToEdit.id, this.userForm.value).subscribe(
        (user:any)=>{
          console.log(user);
          this.router.navigate(['/main/user-list']);
        }
      )
    }
  }

}
