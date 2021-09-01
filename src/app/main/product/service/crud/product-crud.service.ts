import { Injectable } from '@angular/core';
import {AbstractCrud} from "../../../../Abstracts/crud/abstract.crud";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../../model/product.model";

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
}
