import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {Order} from "../dish";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  show=true;
  trashBin = faTrash;
  constructor(public service:CurrencyService) { }

  ngOnInit(): void {
  }

}
