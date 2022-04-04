import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./dish";
import {CurrencyService} from "./currency.service";

@Pipe({
  name: 'rate',
  pure:false
})
export class RatePipe implements PipeTransform {
  constructor(public service : CurrencyService) {
  }
  transform(value: Order[]) {
    if(this.service.filter[2].size > 0) return value.filter(order => this.service.filter[2].has(order.rate));
    else return value;
  }

}
