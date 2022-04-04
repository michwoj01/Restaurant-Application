import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./dish";
import {CurrencyService} from "./currency.service";

@Pipe({
  name: 'kitchen',
  pure:false
})
export class KitchenPipe implements PipeTransform {
  constructor(public service:CurrencyService) {
  }
  transform(value: Order[]){
    if(this.service.filter[0].size > 0) return value.filter(order =>this.service.filter[0].has(order.dish.kuchnia));
    else return value;
  }
}
