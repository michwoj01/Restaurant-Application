import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../currency.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  show=true;
  trashBin = faTrash;
  constructor(public service:CurrencyService) {
  }
  ngOnInit(): void {
  }
}

