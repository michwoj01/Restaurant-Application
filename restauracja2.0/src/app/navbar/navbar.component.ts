import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {AuthenticationService} from "../services/authentication.service";

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
  constructor(public service:CurrencyService, public auth : AuthenticationService) {
  }

  ngOnInit(): void {
  }
  cleanBasket(){
    for(let order of this.service.basketOrders){
      order.instock = 0
    }
    this.service.amount = 0
    this.service.orderCount = 0
    this.service.basketOrders.clear()
  }

}
