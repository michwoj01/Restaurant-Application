import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() endPage!:number;
  constructor(public service:CurrencyService) { }
  ngOnInit(): void {}
}
