import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  footerLinks = [
    {title: 'AVS Telecom', url: 'javasript:void(0)'},
    {title: 'About Us', url: 'javasript:void(0)'},
    {title: 'Blog', url: 'javasript:void(0)'},
    {title: 'Contact Us', url: 'javasript:void(0)'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
