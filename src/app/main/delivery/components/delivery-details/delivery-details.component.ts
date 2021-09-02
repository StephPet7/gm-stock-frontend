import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductCrudService} from "../../../product/service/crud/product-crud.service";
import {DeliveryModel} from "../../model/delivery.model";
import {DeliveryDetailsModel} from "../../model/deliveryDetails.model";
import {DeliveryCrudService} from "../../service/crud/delivery/delivery-crud.service";
import {DeliveryDetailsService} from "../../service/crud/delivery-details/delivery-details.service";
import {UserCrudService} from "../../../user/service/crud/user-crud.service";
import {UserModel} from "../../../user/model/user.model";
import {CommandRowCrudService} from "../../../command/service/crud/commandRow/command-row-crud.service";

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  delivery!: DeliveryModel;
  deliveryDetails!: MatTableDataSource<DeliveryDetailsModel>;
  pageSizeOption = [5, 10, 15];
  displayedColumns: string[] = ['product', 'quantityOrdered', 'remaining', 'quantityDelivered'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private deliveryCrud: DeliveryCrudService,
              private deliveryDetailsCrud: DeliveryDetailsService,
              private productCrud: ProductCrudService,
              private commandRowCrud: CommandRowCrudService,
              private userCrud: UserCrudService) { }

  ngOnInit(): void {
    this.delivery = new DeliveryModel();
    this.delivery.received_by = new UserModel();
    const deliveryId = this.route.snapshot.params['id'];
    this.loadDelivery(deliveryId);
    this.loadDeliveryDetails(deliveryId);
  }

  // load the command to details
  loadDelivery(id: string) {
    this.deliveryCrud.getById(id).subscribe(
      (delivery: DeliveryModel)=> {
        this.delivery = delivery;
        this.userCrud.retrieve(delivery.received_by as string).subscribe(
          (user)=> {
            this.delivery.received_by = user;
          }
        );
      }
    );
  }

  // load CommandRows of the command to details
  loadDeliveryDetails(deliveryId: string) {
    this.deliveryDetailsCrud.getDeliveryDetailsByDeliveryId(deliveryId).subscribe(
      (deliveryDetails)=> {
        console.log(deliveryDetails);
        this.deliveryDetails = new MatTableDataSource<DeliveryDetailsModel>(deliveryDetails);
        this.deliveryDetails.data.forEach(
          (detail)=>{
            this.commandRowCrud.getById(detail.commandRow as string).subscribe(
              (commandRow)=>{
                this.productCrud.getById(commandRow.product as string).subscribe(
                  product=> {
                    commandRow.product = product;
                  }
                );
                detail.commandRow = commandRow;
              }
            )
          }
        );
        this.deliveryDetails.paginator = this.paginator;
      }
    );
  }

}
