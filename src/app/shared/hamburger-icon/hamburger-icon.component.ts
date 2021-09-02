import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'amt-hamburger-icon',
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss']
})
export class HamburgerIconComponent implements OnInit,OnDestroy {
  @Input() type : 'cross' | 'left-arrow'| 'right-arrow' | 'flat' = 'right-arrow';
  _reverse : boolean = false;
  @Input()
  set reverse(value : boolean){
    this._reverse = value;
    this.state = this.state == 'ham-closed' ? 'ham-opened' : 'ham-closed';
  }
  get reverse(){
    return this._reverse;
  }
  @Input() invertColor : boolean = false;
  @Output() clicked = new EventEmitter<any>();
  subscription : Subscription;
  state : 'ham-closed' | 'ham-opened';
  @Input() standalone : boolean = true;


  constructor(private navService : NavigationService) { }

  ngOnInit(): void {
    if(!this.standalone){
      this.screenWidthCheck(window.innerWidth);
      this.subscription = this.navService.sidebarState().subscribe(isOpen=>{
        this.state = isOpen ? 'ham-opened' : 'ham-closed';
      });
    }else{
      this.state = this.reverse ? 'ham-opened' : 'ham-closed';
    }
  }

  screenWidthCheck(windowWidth : number){
    if(windowWidth<environment.screenWidth[environment.closeSidebarBelow]){
      this.state = this.reverse ? 'ham-opened' : 'ham-closed';
    }
    if(windowWidth>environment.screenWidth[environment.closeSidebarBelow]){
      this.state = this.reverse ? 'ham-closed' : 'ham-opened';
    }
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  onClick(){
    if(this.standalone){
      this.state = this.state == 'ham-opened' ? 'ham-closed' : 'ham-opened';
      this.clicked.emit();
    }
  }

}
