import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter-icon',
  templateUrl: './letter-icon.component.html',
  styleUrls: ['./letter-icon.component.scss']
})
export class LetterIconComponent implements OnInit {
  _title!: string;
  @Input()
  set title(value: string){
    this._title = value;
    const segments = this.title.split(' ');
    this.abbr = segments.length > 1 ? segments[0].charAt(0) + segments[1].charAt(0) : segments[0].charAt(0);
  }
  get title(){
    return this._title;
  }
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  abbr!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
