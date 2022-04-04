import { Component, OnInit } from '@angular/core';
import {pastOrder} from "../../user";
import {AuthenticationService} from "../../services/authentication.service";
import {CurrencyService} from "../../services/currency.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userid : string
  pastOrders:pastOrder[]

  constructor(public auth : AuthenticationService, public service : CurrencyService) {
    this.userid = JSON.parse(localStorage.getItem("user")!).uid!
    this.auth.getPastOrders(this.userid).valueChanges().subscribe((data: any) => {
      this.pastOrders = data
      for (let order of this.pastOrders) {
        this.auth.getPastOrders(this.userid).doc(order.id).collection("howmany").valueChanges().subscribe((another: any) => {
          order.howmany = another
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
