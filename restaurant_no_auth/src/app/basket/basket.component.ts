import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../currency.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(public service : CurrencyService, public location:Location) { }

  ngOnInit(): void {
  }

}
