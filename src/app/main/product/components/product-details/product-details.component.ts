import { Component, OnInit } from '@angular/core';
import {ProductCrudService} from "../../service/crud/product-crud.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductModel} from "../../model/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductModel;

  constructor(private productCrud: ProductCrudService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = new ProductModel();
    const id = this.route.snapshot.params['id'];
    this.loadProduct(id);
  }

  loadProduct(id: string) {
    if(id===null) throw new Error('Provided id is null');
    else
      this.productCrud.getById(id).subscribe(
        product => {
          console.log(product);
          this.product = product;
        },
        error => {
          alert('Erreur lors du chargement du produit');
        }
      );
  }

  getAlertColor():boolean {
    return this.product.stockQuantity!<this.product.alertThreshold!;
  }

  onEdit() {
    this.router.navigate(['/main/edit-product/', this.product.id]);
  }

  onBack() {
    this.router.navigate(['/main/product-list']);
  }
}
