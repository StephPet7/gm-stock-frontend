import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';
import {AuthgardService} from "../pages/login/service/guard/authgard.service";
import {ProductListComponent} from "./product/components/product-list/product-list.component";
import {ProductDetailsComponent} from "./product/components/product-details/product-details.component";
import {EditProductComponent} from "./product/components/edit-product/edit-product.component";
import {CommandListComponent} from "./command/components/command-list/command-list.component";
import {EditCommandComponent} from "./command/components/edit-command/edit-command.component";
import {CommandDetailsComponent} from "./command/components/command-details/command-details.component";

const routes: Routes = [
  {
    path: '', canActivate: [AuthgardService], component: MainComponent,
    children: [
      { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
      { path: 'dashboard', canActivate: [AuthgardService], component: DashboardComponent },
      { path: 'product-list',  component: ProductListComponent },
      { path: 'product-details/:id',  component: ProductDetailsComponent},
      { path: 'edit-product/:id',  component: EditProductComponent},
      { path: 'edit-provider/',  component: EditProductComponent},
      { path: 'command-list',  component: CommandListComponent },
      { path: 'edit-command',  component: EditCommandComponent},
      { path: 'command-details/:id',  component: CommandDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
