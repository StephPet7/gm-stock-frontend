import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NavigationService } from '../navigation.service';
import { MENU_ITEMS } from '../sidebar/sidebar.component';
import {LoginService} from "../../pages/login/service/login/login.service";
import {UserCrudService} from "../../main/user/service/crud/user-crud.service";
import {UserModel} from "../../main/user/model/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private titleList!: any[];
  sticky = false;
  user!: UserModel;

  constructor(private location: Location,
              private navService: NavigationService,
              private router: Router,
              private loginService: LoginService,
              private userCrud: UserCrudService) { }

  ngOnInit(): void {
    this.titleList = MENU_ITEMS.map(item => item);
    this.loadLoggedUser();
  }

  getTitle(){
    let currentUrl = this.location.prepareExternalUrl(this.location.path());
    if (currentUrl.charAt(0) === '#'){
        currentUrl = currentUrl.slice( 1 );
    }
    if (currentUrl.includes('/main/edit-service')) {
      return 'Editer un service';
    }
    if (currentUrl === '/main/seller-details') {
      return 'Détails Marchand';
    }
    if (currentUrl.includes('/main/edit-seller')) {
      return 'Editer un Marchand';
    }
    if (currentUrl.includes('/main/edit-product')) {
      return 'Editer un Produit';
    }
    if (currentUrl.includes('/main/product-details')) {
      return 'Détails Produit';
    }
    if (currentUrl === '/main/product-list') {
      return 'Liste des Produits';
    }
    if (currentUrl === '/main/command-list') {
      return 'Liste des Commandes';
    }
    if (currentUrl.includes('/main/edit-command')) {
      return 'Enregistrer une commande';
    }
    if (currentUrl.includes('/main/command-details')) {
      return 'Détails Commande';
    }
    if (currentUrl.includes('/main/edit-delivery')) {
      return 'Editer une livraison';
    }
    if (currentUrl.includes('/main/user-details')) {
      return 'Informations d\'utilisateur';
    }

    for (let item = 0; item < this.titleList.length; item++){
        if (this.titleList[item].url === currentUrl){
            return this.titleList[item].title;
        }
        if (this.titleList[item].subMenu && this.titleList[item].subMenu.length > 0){
          let subMenuItem = this.titleList[item].subMenu.find((sm: { url: string; }) => sm.url === currentUrl);
          if (subMenuItem){
            return subMenuItem.title;
          }
        }
    }
    return 'Tableau de bord';
  }

  toggleSidebar(){
    this.navService.toggleSidebar();
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['pages', 'login']);
  }

  loadLoggedUser() {
    this.userCrud.retrieve(localStorage.getItem('user')).subscribe(
      (user: any)=> {
        this.user = user;
      }
    )
  }

}
