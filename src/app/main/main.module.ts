import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ProductDetailsComponent } from './product/components/product-details/product-details.component';
import { EditProductComponent } from './product/components/edit-product/edit-product.component';
import { CommandListComponent } from './command/components/command-list/command-list.component';
import { EditCommandComponent } from './command/components/edit-command/edit-command.component';
import { ProductDialogComponent } from './command/components/edit-command/product-dialog/product-dialog.component';
import { CommandDetailsComponent } from './command/components/command-details/command-details.component';
import { DeliveryListComponent } from './delivery/components/delivery-list/delivery-list.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    ProductListComponent,
    ProductDetailsComponent,
    EditProductComponent,
    CommandListComponent,
    EditCommandComponent,
    ProductDialogComponent,
    CommandDetailsComponent,
    DeliveryListComponent,
  ],

  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatNativeDateModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    ChartsModule,
    HttpClientModule,
    ColorPickerModule,
    PerfectScrollbarModule
  ],
  providers : [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class MainModule { }
