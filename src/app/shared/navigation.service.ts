import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sidebarOpen = new Subject<boolean>();
  private sidebarOpened = true;


  constructor() { }

  toggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarOpen.next(this.sidebarOpened);
  }

  open(){
    this.sidebarOpened = true;
    this.sidebarOpen.next(this.sidebarOpened);
  }

  close(){
    this.sidebarOpened = false;
    this.sidebarOpen.next(this.sidebarOpened);
  }

  sidebarState(){
    return this.sidebarOpen.asObservable();
  }

}
