import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import {MainModule} from "./main/main.module";
import {PagesModule} from "./pages/pages.module";
import {HttpClientModule}  from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CdkTableModule} from "@angular/cdk/table";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MainModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    CdkTableModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
