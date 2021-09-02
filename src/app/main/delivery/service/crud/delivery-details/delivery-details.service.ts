import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../../Abstracts/crud/abstract.crud";
import {DeliveryDetailsModel} from "../../../model/deliveryDetails.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeliveryDetailsService extends AbstractCrud<DeliveryDetailsModel>{

  constructor(http: HttpClient) {
    super(http,
      'api/deliveryDetails',
      'api/deliveryDetails/',
      'api/deliveryDetails/',
      'api/deliveryDetails/',
      'api/deliveryDetails/')
  }
}
