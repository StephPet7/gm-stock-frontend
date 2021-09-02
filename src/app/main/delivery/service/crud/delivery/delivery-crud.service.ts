import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../../Abstracts/crud/abstract.crud";
import {DeliveryModel} from "../../../model/delivery.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliveryCrudService extends AbstractCrud<DeliveryModel>{

  constructor(http: HttpClient) {
    super(http,
      'api/deliveries',
      'api/deliveries/',
      'api/deliveries/',
      'api/deliveries/',
      'api/deliveries/')
  }
}
