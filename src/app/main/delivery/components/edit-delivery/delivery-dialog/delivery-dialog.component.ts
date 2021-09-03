import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delivery-dialog',
  templateUrl: './delivery-dialog.component.html',
  styleUrls: ['./delivery-dialog.component.scss']
})
export class DeliveryDialogComponent implements OnInit {

  quantityDelivered=0;
  constructor(
    public dialogRef: MatDialogRef<DeliveryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: string, ordered: number, remain: number, deliver: number}) {
    this.quantityDelivered = data.deliver;
  }

    ngOnInit() {
    }

  onCancel(): void {
    this.dialogRef.close();
  }

}
