import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from "./service/login/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordHide = true;
  notAuthorize: boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.loginService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      (res:any) => {
        localStorage.clear();
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        localStorage.setItem('access_exp', res.access_exp);
        this.getLoggedUser();
        this.router.navigate(['/main/dashboard']);
      },
      (error:any) => {
        if(error.status===401) this.notAuthorize = true;
      }
    )
  }

  getLoggedUser() {
    this.loginService.getUserLogged().subscribe(
      (user:any)=>{
        localStorage.setItem('user', user.id);
      }
    );
  }

}
