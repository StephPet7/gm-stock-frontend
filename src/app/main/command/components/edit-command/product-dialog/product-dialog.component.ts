import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductModel} from "../../../../product/model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductCrudService} from "../../../../product/service/crud/product-crud.service";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit{

  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ProductDialogComponent>,
              private productCrud: ProductCrudService) {
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: [0.0, Validators.required],
      stockUnit: ['', Validators.required],
      alertThreshold: [0]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreateProduct() {
    let product = this.productForm.value;
    product.stockQuantity = 0;

    this.productCrud.create(product).subscribe(
      (product:ProductModel)=>{
        console.log(product);
      },
      error => {
        console.log(error);
      }
    );
  }
}
