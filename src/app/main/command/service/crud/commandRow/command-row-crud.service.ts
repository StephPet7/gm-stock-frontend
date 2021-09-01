import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../../Abstracts/crud/abstract.crud";
import {CommandRowModel} from "../../../model/commandRow.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class CommandRowCrudService extends AbstractCrud<CommandRowModel>{

  constructor(http: HttpClient) {
    super(http,
'api/commandRows',
'api/commandRows/',
'api/commandRows/',
'api/commandRows/',
'api/commandRows/')
  }

  getCommandRowsByCommand(id: string) {
    return this.httpClient.get<any[]>(environment.baseUrl + 'api/commandRow/command/', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      },
      params: {
        command_id: id
      }
    });
  }
}
