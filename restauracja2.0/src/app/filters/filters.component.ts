import { Component, OnInit } from '@angular/core';
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(public service:CurrencyService) { }

  changeDownPrice():void{
    this.service.downPrice = parseInt((<HTMLInputElement> document.getElementById("minimal")!).value);
  }
  changeUpPrice():void{
    this.service.upPrice = parseInt((<HTMLInputElement> document.getElementById("maximal")!).value);
  }
  checkForks():number{
    if(this.service.upPrice! < this.service.downPrice!) return 1;
    else return 0;
  }
  updateFilter(value:any,filt:number){
    if(this.service.filter[filt].has(value))this.service.filter[filt].delete(value);
    else this.service.filter[filt].add(value);
  }
  ngOnInit(): void {
  }

}
