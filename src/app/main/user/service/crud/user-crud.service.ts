import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../Abstracts/crud/abstract.crud";
import {UserModel} from "../../model/user.model";
import {HttpClient} from "@angular/common/http";

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
}
