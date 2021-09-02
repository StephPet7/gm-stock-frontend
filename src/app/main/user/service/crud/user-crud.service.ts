import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../Abstracts/crud/abstract.crud";
import {UserModel} from "../../model/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserCrudService extends AbstractCrud<UserModel>{

  constructor(http: HttpClient) {
    super(http,
      'api/user/all',
      'api/user/retrieve/',
      'api/user/register/',
      'api/user/update/',
      'api/user/delete/')
  }

  retrieve(id: string) {
    return this.httpClient.get(environment.baseUrl+'api/user/retrieve/', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      },
      params: {
        id: id
      }
    })
  }
}
