import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../../Abstracts/crud/abstract.crud";
import {DeliveryDetailsModel} from "../../../model/deliveryDetails.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";

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

  getDeliveryDetailsByDeliveryId(id: string) {
    return this.httpClient.get<DeliveryDetailsModel[]>(environment.baseUrl + 'api/deliveryDetail/delivery', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      },
      params: {
        delivery_id: id
      }
    })
  }
}
