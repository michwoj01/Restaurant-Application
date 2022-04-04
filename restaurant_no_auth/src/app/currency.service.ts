import { Injectable } from '@angular/core';
import {Dish, Order} from "./dish";
import {myOpinion, Opinion} from "./opinion";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  sharedData:string ='$';
  amount:number = 0;
  orderCount:number=0;
  maxPrice?:number;
  minPrice?:number;
  downPrice?:number;
  upPrice?: number;
  size:number = 2;
  page:number = 1;
  myOrders:Order[] = [];
  kitchens ?: Set<String>;
  categories ?: Set<String>;
  basketOrders:Set<Order> = new Set();
  filter:any[] = [];
  stars:number[] = [1,2,3,4,5];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpclient : HttpClient) {
    this.refreshList();
    for (let i = 0; i <3; i++){
      this.filter.push(new Set());
    }
  }
  refreshList(){
    this.getDishes().subscribe(complete => {
      this.kitchens = new Set();
      this.categories = new Set();
      this.maxPrice = 0;
      this.minPrice = 1000;
      this.myOrders = complete.map(dish => new Order(dish));
      for (let order of this.myOrders){
        if(!this.kitchens.has(order.dish.kuchnia)) this.kitchens.add(order.dish.kuchnia);
        if(!this.categories.has(order.dish.kategoria)) this.categories.add(order.dish.kategoria);
        this.maxPrice = Math.max(this.maxPrice, order.dish.price);
        this.minPrice = Math.min(this.minPrice, order.dish.price);
      }
      this.downPrice = this.minPrice;
      this.upPrice = this.maxPrice;
    });
  }
  getDishes(): Observable<Dish[]>{
    return this.httpclient.get<Dish[]>("http://localhost:3000/dishes");
  }
  getDish(id:number):Observable<Dish>{
    return this.httpclient.get<Dish>("http://localhost:3000/dishes/"+id);
  }
  addDish(dish:Dish):void{
    this.httpclient.post<Dish>("http://localhost:3000/create", dish, this.httpOptions).subscribe(() => this.refreshList());
  }
  updateDish(dish:Dish):void{
    this.httpclient.put("http://localhost:3000/dishes/"+ dish.id,dish).subscribe(() => this.refreshList());
  }
  deleteDish(order:Order):void{
    this.httpclient.delete("http://localhost:3000/dishes/"+order.dish.id).subscribe(() => {
      this.refreshList();
      if(this.basketOrders.has(order)){
        this.amount -= order.dish.price * order.instock;
        this.orderCount -= order.instock;
        this.basketOrders.delete(order);
      }
    });
  }
  currencyRate(price:number):number{
    if (this.sharedData == '$') return price;
    else return Math.round(price*0.9*100)/100;
  }
  add(order:Order):void{
    order.instock += 1;
    this.amount += order.dish.price;
    this.orderCount += 1;
    if(!this.basketOrders.has(order)) this.basketOrders.add(order);
  }
  substract(order:Order):void{
    order.instock -= 1;
    this.amount -= order.dish.price;
    this.orderCount -= 1;
    if(order.instock == 0) this.basketOrders.delete(order);
  }
  compare(a:Order, b:Order) :number {
    if (a.dish.price <b.dish.price) return -1;
    if (a.dish.price > b.dish.price) return 1;
    else return 0;
  }
  changeColor(order:Order):string{
    if(order.dish.units - order.instock > order.dish.units/2){
      return "green";
    }
    else if( order.dish.units - order.instock > order.dish.units/4){
      return "yellow";
    }
    else return "red";
  }
  checkExtr(price:number):string{
    if(this.maxPrice == price) return "green";
    else if(this.minPrice == price) return "red";
    else return "transparent";
  }
  countStar(star:number,order:Order) {
    order.rate = star;
  }
  addOpinion(order:Order,value:Opinion){
    order.opinions.push(new myOpinion(value));
    order.opinions =[...order.opinions];
  }
}
