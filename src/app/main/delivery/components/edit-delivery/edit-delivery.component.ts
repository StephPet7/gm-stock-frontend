import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryCrudService} from "../../service/crud/delivery/delivery-crud.service";
import {DeliveryDetailsService} from "../../service/crud/delivery-details/delivery-details.service";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommandModel} from "../../../command/model/command.model";
import {CommandCrudService} from "../../../command/service/crud/command/command-crud.service";
import {MatDialog} from "@angular/material/dialog";
import {CommandRowCrudService} from "../../../command/service/crud/commandRow/command-row-crud.service";
import {MatTableDataSource} from "@angular/material/table";
import {CommandRowModel} from "../../../command/model/commandRow.model";
import {MatPaginator} from "@angular/material/paginator";
import {ProductCrudService} from "../../../product/service/crud/product-crud.service";
import {DeliveryDialogComponent} from "./delivery-dialog/delivery-dialog.component";

@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.scss']
})
export class EditDeliveryComponent implements OnInit {

  commands!: FormArray;
  commandToSelect!: Array<CommandModel>;
  selectedCommandIds = [];
  details = new Array<{index:number, commandRowId:string, quantityDelivered: number, remaining:number, productId: string}>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,
              private deliveryCrud: DeliveryCrudService,
              private deliveryDetailCrud: DeliveryDetailsService,
              private commandCrud: CommandCrudService,
              private commandRowCrud: CommandRowCrudService,
              private productCrud: ProductCrudService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.commands = this.formBuilder.array([]);
    this.loadCommandToSelect();
  }

  loadCommandToSelect() {
    this.commandCrud.getAll().subscribe(
      (commands:any)=>{
        this.commandToSelect = commands.results;
      }
    );
  }

  getCommandsFormGroup(): FormGroup[] {
    return <FormGroup[]>(this.commands.controls);
  }

  addCommands() {
    this.commands.push(
      this.formBuilder.group({
        command: ['', Validators.required],
        commandRows: [[]],
        selected: [false]
      })
    );
    this.selectedCommandIds.push('');
  }

  removeCommands(commandId: string, index: number) {
    this.commands.removeAt(index);
    this.removeOnDetails(index);
    this.selectedCommandIds.splice(index, 1)
  }

  isSelected(commandId: string): boolean {
    let value = false;
    this.selectedCommandIds.forEach(
      id => {
        if(id===commandId) value=true;
      }
    );
    return value;
  }

  onCommandSelection(id: string, index:number) {
     if(this.isSelected(id)) {
       this.commands.at(index).get('selected').setValue(true);
       this.selectedCommandIds[index] = id;
     }
     else {
       this.commands.at(index).get('selected').setValue(false);
       this.selectedCommandIds[index] = id;
       this.commandRowCrud.getCommandRowsByCommand(id).subscribe(
         (rows)=>{
           let commandRowsTable = new MatTableDataSource<CommandRowModel>(rows);
           commandRowsTable.data.forEach(
             (row)=>{
               this.productCrud.getById(row.product as string).subscribe(
                 (product)=>{
                   row.product = product;
                 }
               );
             }
           );
           commandRowsTable.paginator = this.paginator;
           (this.commands.at(index).get('commandRows').setValue(commandRowsTable));
         }
       )
     }
  }

  // Operations on details array --------------------------------------------------
  existsOnDetails(rowId: string): boolean {
    let value = false;
    this.details.forEach(
      (elt)=>{
        if(elt.commandRowId===rowId) value = true
      }
    );
    return value;
  }

  setOnDetails(rowId: string, quantityDelivered: number) {
    let index = this.details.findIndex((elt)=>elt.commandRowId===rowId);
    this.details[index].quantityDelivered = quantityDelivered;
  }

  pushOnDetails(index: number, rowId: string, remaining:number, quantityDelivered: number, productRowId:string) {
    this.details.push({
      index: index,
      commandRowId: rowId,
      remaining: remaining,
      quantityDelivered: quantityDelivered,
      productId: productRowId
    });
  }

  removeOnDetails(index: number) {
    this.details = this.details.filter((elt)=>elt.index!=index);
  }

  getQuantityDeliveredFromDetails(id: string): number {
    if(this.details.length===0) return 0;
    else return this.details.find((elt)=>elt.commandRowId===id).quantityDelivered;
  }
  //---------------------------------------------------------------------------


  onEditQuantityToDeliver(index:number, commandRow: any) {
    const dialogRef = this.dialog.open(DeliveryDialogComponent, {
      width: '500px',
      data: {
        product: commandRow.product.name,
        ordered: commandRow.quantityOrdered,
        remain: commandRow.remaining,
        deliver: this.getQuantityDeliveredFromDetails(commandRow.id)}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(this.existsOnDetails(commandRow.id)) this.setOnDetails(commandRow.id, result);
        else this.pushOnDetails(index, commandRow.id, commandRow.remaining, result, commandRow.product.id);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/main/delivery-list']);
  }

  onSubmit() {
    // save delivey
    this.deliveryCrud.create({
      received_by: localStorage.getItem('user')
    }).subscribe(
      (delivery: any)=>{
        console.log(delivery);
        this.details.forEach(
          (detail)=> {
            // save delivery detail
            this.deliveryDetailCrud.create({
              quantityDelivered: detail.quantityDelivered,
              commandRow: detail.commandRowId,
              delivery: delivery.id
            }).subscribe(
              (detail)=> {
              }
            );
            let remaining = detail.remaining-detail.quantityDelivered;

            // update commandRow remaining
            this.commandRowCrud.update(detail.commandRowId, {
              remaining: (remaining<0)?0:remaining}).subscribe(
                row=>{}
            );

            // update product quantity
            this.productCrud.getProductQuantityById(detail.productId).subscribe(
              (response: any)=>{
                this.productCrud.update(detail.productId, {stockQuantity: response.stockQuantity+ detail.quantityDelivered})
                  .subscribe(
                    product=>{}
                  );
              }
            );
          }
        );
        this.router.navigate(['/main/delivery-list']);
      }
    );
  }
}
