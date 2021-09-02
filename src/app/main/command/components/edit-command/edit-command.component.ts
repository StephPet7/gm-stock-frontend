import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductCrudService} from "../../../product/service/crud/product-crud.service";
import {ProductModel} from "../../../product/model/product.model";
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";
import {LoginService} from "../../../../pages/login/service/login/login.service";
import {CommandCrudService} from "../../service/crud/command/command-crud.service";
import {CommandRowCrudService} from "../../service/crud/commandRow/command-row-crud.service";
import {CommandModel} from "../../model/command.model";
import {CommandRowModel} from "../../model/commandRow.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-command',
  templateUrl: './edit-command.component.html',
  styleUrls: ['./edit-command.component.scss']
})
export class EditCommandComponent implements OnInit {

  productActions = new Array<'SELECT'|'CREATE'>();
  commandForm!: FormGroup;
  productsToSelect!: Array<ProductModel>;
  commandLines!: Array<{product: ProductModel, quantityOrdered: number}>
  productDuplication!: boolean;

  constructor(private formBuilder: FormBuilder,
              private productCrud: ProductCrudService,
              private commandCrud: CommandCrudService,
              private commandRowCrud: CommandRowCrudService,
              private loginService: LoginService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.commandForm = this.formBuilder.group({
      title: ['', Validators.required],
      commandLine: this.formBuilder.array([])
    });
    this.loadProductsToSelect();
  }

  loadProductsToSelect() {
    this.productCrud.getAll().subscribe(
      (products:any) => {
        this.productsToSelect = products.results;
    });
  }

  getCommandLineFormGroup() : FormGroup[]{
    return <FormGroup[]>(<FormArray>this.commandForm.get('commandLine')).controls;
  }

  addCommandLine() : void {
    (<FormArray>this.commandForm.get('commandLine')).push(
      this.addCommandLineFormGroup()
    );
    this.productActions.push('SELECT');
    this.loadProductsToSelect();
  }

  addCommandLineFormGroup() {
    return this.formBuilder.group({
      product: ['', Validators.required],
      quantityOrdered: [0, Validators.required]
    });
  }

  removeCommandLine(index:number) {
    if(index===null) throw new Error('The index you passed is null');
    else if((<FormArray>this.commandForm.get('commandLine')).length === 0) {
      throw new Error('commandLine Form Array is null');
    }
    else {
      (<FormArray>this.commandForm.get('commandLine')).removeAt(index);
      this.productActions.splice(index, 1);
    }
  }

  onNewProduct(index: number) {
    this.productActions[index] = "CREATE";
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadProductsToSelect();

        let tmp = ((this.commandForm.get('commandLine') as FormArray).controls as FormGroup[])[index].get('product');
        if(tmp != null) tmp.setValue(result);

      }
      else this.productActions[index]="SELECT";
    });
  }



  getCommandLinesFromForm() {
    this.productDuplication = false;
    this.loadProductsToSelect();
    this.commandLines = new Array<{product: ProductModel, quantityOrdered: number}>();
    this.getCommandLineFormGroup().forEach(
      fg=>{
        this.commandLines.forEach(
          (line)=>{
            if(line.product.name===fg.value.product) this.productDuplication = true;
          }
        );
        if(!this.productDuplication) {
          let product = new ProductModel();
          this.productsToSelect.forEach(
            p => {
              if(p.name===fg.value.product) product=p;
            }
          );
          this.commandLines.push({product: product, quantityOrdered:fg.value.quantityOrdered});
        }
      }
    );
  }


  getTotalPrice(): number{
    let total = 0;
    this.commandLines.forEach(
      line=>{
        total+=line.product.unitPrice * line.quantityOrdered
      }
    );
    return total;
  }

  onSubmit() {
    //save the command
    this.getCommandLinesFromForm();
    if(!this.productDuplication) {
      this.commandCrud.create({
        title: this.commandForm.get('title')?.value,
        totalPrice: this.getTotalPrice(),
        command_by:localStorage.getItem('user')}).subscribe(
        (command:CommandModel|any) => {
          console.log(command);
          this.commandLines.forEach(
            (line)=> {
              this.commandRowCrud.create({
                command:command.id,
                product:line.product.id,
                quantityOrdered:line.quantityOrdered,
                remaining: line.quantityOrdered}).subscribe(
                (commandRow:CommandRowModel)=>{
                  console.log(commandRow);
                },
                error => {
                  console.log(error);
                }
              );
            }
          );
          this.router.navigate(['/main/command-list']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
