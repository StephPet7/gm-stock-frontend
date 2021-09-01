import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HamburgerIconComponent } from './hamburger-icon/hamburger-icon.component';
import { FooterComponent } from './footer/footer.component';
import { LetterIconComponent } from './letter-icon/letter-icon.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HamburgerIconComponent,
    FooterComponent,
    LetterIconComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ], exports: [
    AngularMaterialModule,
    SidebarComponent,
    NavbarComponent,
    HamburgerIconComponent,
    FooterComponent,
    LetterIconComponent,
  ]
})
export class SharedModule { }
