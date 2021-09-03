import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../Abstracts/crud/abstract.crud";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../../model/product.model";
import {environment} from "../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService extends AbstractCrud<ProductModel>{

  constructor(httpClient: HttpClient) {
    super(httpClient,
      'api/products',
      'api/products/',
      'api/products/',
      'api/products/',
      'api/products/');
  }

  getProductQuantityById(id: string) {
    return this.httpClient.get(environment.baseUrl + 'api/product/quantity/', {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('access')
      },
      params: {
        product_id: id
      }
    })
  }
}
