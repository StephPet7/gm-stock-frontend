import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export const MENU_ITEMS: Array<SidebarItem> = [
  { icon: 'home', title: 'Tableau de bord', url: '/main/dashboard' },
  { icon: 'inventory_2', title: 'Produit', url: '/main/product-list' },
  { icon: 'takeout_dining', title: 'Commande', url: '/main/command-list' },
  { icon: 'local_shipping', title: 'Livraison', url: '/main/delivery-list' },
  { icon: 'portrait', title: 'Utilisateurs', url: '/main/user-list' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems!: Array<SidebarItem>;
  @Output() menuSelect = new EventEmitter<any>();

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.menuItems = MENU_ITEMS.map(menuItem => menuItem);
    this.getActiveParent();
  }

  getActiveParent() {
    let currentUrl = this.location.prepareExternalUrl(this.location.path());
    if (currentUrl.charAt(0) === '#') {
      currentUrl = currentUrl.slice(1);
    }
    this.menuItems.forEach(mi => {
     if (mi.subMenu && mi.subMenu.length > 0){
       const activeSubMenu = mi.subMenu.find(sm => sm.url === currentUrl);
       mi.isActive = activeSubMenu ? true : false;
     }
   });
  }

  menuSelected(){
    this.menuSelect.emit();
  }
}

interface SidebarItem {
  icon?: string;  // Refer to https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
  // Use 1 or 2 letters instead of icon, if both are missing, letter icon will be created based on title
  abbr?: string;
  title: string;
  url?: string;
  disabled?: boolean;
  isActive?: boolean;
  subMenu?: Array<{ icon?: string, abbr?: string, title: string, url: string, disabled?: boolean }>;
}
