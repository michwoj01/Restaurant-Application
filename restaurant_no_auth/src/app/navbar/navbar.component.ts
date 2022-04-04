import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../currency.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  change(value:string):void{
    this.service.sharedData=value;
  }
  checkOrders():boolean{
    return this.service.orderCount <= 0;
  }
  constructor(public service:CurrencyService) { }

  ngOnInit(): void {
  }

}
