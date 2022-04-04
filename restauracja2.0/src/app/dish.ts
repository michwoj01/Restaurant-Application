import {Opinion} from "./opinion";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";

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
  opinions:AngularFirestoreCollection<Opinion>;
  rate:number;
  ratedby:number;
}
export class Order{
  dish:Dish;
  instock:number = 0;
  constructor(dish:Dish) {
    this.dish = dish;
  }
}
