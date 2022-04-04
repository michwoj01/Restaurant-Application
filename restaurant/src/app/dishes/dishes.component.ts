import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  show=true;
  trashBin = faTrash;
  constructor(public service:CurrencyService,
              public auth:AuthenticationService) {
  }
  ngOnInit(): void {
  }
}

