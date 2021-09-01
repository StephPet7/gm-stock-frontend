import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../shared/navigation.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class MainComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  isOpen = true;
  mode: 'side'|'over'|'push' = 'side';
  environment = environment;

  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
    this.subscription = this.navService.sidebarState().subscribe(isOpen => {
      this.isOpen = isOpen;
    });
    this.screenWidthCheck(window.innerWidth);
  }

  onResize(event){
    this.screenWidthCheck(event.target.innerWidth);
  }

  screenWidthCheck(windowWidth: number){
    if (windowWidth < environment.screenWidth[environment.closeSidebarBelow] && this.isOpen){
      this.mode = 'over';
      this.navService.close();
    }
    if (windowWidth > environment.screenWidth[environment.closeSidebarBelow] && !this.isOpen){
      this.mode = 'side';
      this.navService.open();
    }
  }

  onBackdropClick(){
    this.navService.close();
  }

  onMenuSelect(){
    if (this.mode === 'over'){
      this.navService.close();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
