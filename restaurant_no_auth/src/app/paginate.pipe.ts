import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyService} from "./currency.service";
import {Order} from "./dish";

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {
  constructor(public service:CurrencyService) {
  }
  transform(value: Order[], pageNumber:number,pageSize:number){
    return value.slice((pageNumber-1)*pageSize,pageNumber*pageSize);
  }
}
