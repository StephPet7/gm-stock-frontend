import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  login(email:string, password: string) {
    return this.http.post(environment.baseUrl + 'api/user/login/', {
      email: email,
      password: password
    });
  }

  getUserLogged() {
    return this.http.get(environment.baseUrl + 'api/user/token/', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      }
    });
  }

  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access_exp");
    localStorage.removeItem("user");
  }

  public isLoggedIn() {
    let d = new Date(localStorage.getItem('access_exp'));
    d.setHours(d.getHours()+1)
    return (new Date()< d);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
