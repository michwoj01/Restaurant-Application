import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "./dish";
import {CurrencyService} from "./currency.service";

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {
  constructor(public service:CurrencyService) {
  }
  transform(value: Order[]) {
    return value.filter(order => order.dish.price >= this.service.downPrice! && order.dish.price <= this.service.upPrice!);
  }

}
