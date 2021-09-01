import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../../Abstracts/crud/abstract.crud";
import {CommandModel} from "../../../model/command.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommandCrudService extends AbstractCrud<CommandModel>{

  constructor(httpClient: HttpClient) {
    super(httpClient,
      'api/commands',
      'api/commands/',
      'api/commands/',
      'api/commands/',
      'api/commands/');
  }
}
