import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { PagesModule } from './pages/pages.module';
import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./pages/login/service/interceptor/auth-interceptor.service";

const routes: Routes = [{
  path: '', component: AppComponent,
  children: [
    { path: '', redirectTo: 'pages', pathMatch: 'full'},
    { path: 'main', loadChildren : () => MainModule },
    { path: 'pages', loadChildren : () => PagesModule },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
