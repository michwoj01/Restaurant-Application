import {Opinion} from "./opinion";

export interface Dish {
  id:string,
  name: string,
  images :string[];
  kuchnia:string,
  kategoria:string,
  skladniki: string[],
  units:number,
  price:number,
  description:string,
}
export class Order{
  dish:Dish;
  instock:number = 0;
  rate?:number;
  opinions: Opinion[] = [];
  constructor(dish:Dish) {
    this.dish = dish;
  }
}
