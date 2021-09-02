import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {DeliveryModel} from "../../model/delivery.model";
import {DeliveryCrudService} from "../../service/crud/delivery/delivery-crud.service";
import {UserCrudService} from "../../../user/service/crud/user-crud.service";

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliveries!: MatTableDataSource<DeliveryModel>;
  pageSizeOption = [5, 10, 15];
  displayedColumns: string[] = ['deliveryDate', 'received_by', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private deliveryCrud: DeliveryCrudService,
              private router: Router,
              private userCrud: UserCrudService) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.deliveryCrud.getAll().subscribe(
      (deliveries: any) => {
        this.deliveries = new MatTableDataSource<DeliveryModel>(deliveries.results);
        this.deliveries.data.forEach(
          (delivery)=> {
            this.userCrud.retrieve(delivery.received_by).subscribe(
              (user)=>{
                delivery.received_by = user;
              }
            );
          }
        )
        this.deliveries.paginator = this.paginator;
        console.log(deliveries.results);
      }
    );
  }

  onDetails(id: string) {
    return this.router.navigate(['/main/delivery-details', id]);
  }

  onNew() {
    return this.router.navigate(['/main/edit-delivery']);
  }

}
