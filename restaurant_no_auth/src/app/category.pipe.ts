import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./dish";
import {CurrencyService} from "./currency.service";

@Pipe({
  name: 'category',
  pure:false
})
export class CategoryPipe implements PipeTransform {
  constructor(public service:CurrencyService) {
  }
  transform(value: Order[]) {
    if(this.service.filter[1].size > 0) return value.filter(order => this.service.filter[1].has(order.dish.kategoria));
    else return value;
  }

}
