import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductModel} from "../../model/product.model";
import {ProductCrudService} from "../../service/crud/product-crud.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  duplicatedName?: boolean;
  newProduct?: boolean;
  productForm?: FormGroup;
  productToSave?: ProductModel;

  constructor(private formBuilder: FormBuilder,
              private productCrud: ProductCrudService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: [0.0, Validators.required],
      stockUnit: ['', Validators.required],
      stockQuantity: [0.0, Validators.required],
      alertThreshold: [0, Validators.required]
    });
    this.productToSave = new ProductModel();
    this.route.params.subscribe((params: any)=> {
      if(params.id) {
        this.newProduct = false;
        this.productToSave!.id = params.id;
        this.loadProductToUpdate();
      }
      else {
        this.newProduct = true;
      }
    });
  }

  loadProductToUpdate() {
    this.productCrud.getById(this.productToSave!.id as string).subscribe(
      response => {
        this.productToSave = response;
        this.initFormWhenUpdating();
      },
      error =>  {
        alert('Erreur lors de la lecture du service');
        console.log(error);
      }
    );
  }

  initFormWhenUpdating() {
    this.productForm!.get('name')!.setValue(this.productToSave!.name);
    this.productForm!.get('description')!.setValue(this.productToSave!.description);
    this.productForm!.get('unitPrice')!.setValue(this.productToSave!.unitPrice);
    this.productForm!.get('stockUnit')!.setValue(this.productToSave!.stockUnit);
    this.productForm!.get('stockQuantity')!.setValue(this.productToSave!.stockQuantity);
    this.productForm!.get('alertThreshold')!.setValue(this.productToSave!.alertThreshold);
  }

  getValuesFromForm() {
    this.productToSave!.name = this.productForm!.get('name')!.value;
    this.productToSave!.description = this.productForm!.get('description')!.value;
    this.productToSave!.unitPrice = this.productForm!.get('unitPrice')!.value;
    this.productToSave!.stockUnit = this.productForm!.get('stockUnit')!.value;
    this.productToSave!.stockQuantity = this.productForm!.get('stockQuantity')!.value;
    this.productToSave!.alertThreshold = this.productForm!.get('alertThreshold')!.value;
  }

  onReset() {

  }

  onSubmitForm() {
    this.getValuesFromForm();
    if (this.newProduct) {
      this.productCrud.create(this.productToSave!).subscribe(
        (response) => {
          this.router.navigate(['/main/edit-command']);
          console.log(response);
        },
        (error) => {
          alert('Erreur lors de l\'ajout du Produit');
          console.log(error)
        }
      );
    }
    else {
      this.productCrud.update(this.productToSave!.id!, this.productToSave!).subscribe(
        (response) => {
          this.router.navigate(['/main/product-details', this.productToSave!.id]);
        },
        (error) => {
          alert('Echec de la mise à jour du produit');
          console.log(error);
        }
      );
    }
  }
}
