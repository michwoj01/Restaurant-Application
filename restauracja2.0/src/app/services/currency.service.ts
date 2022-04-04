import { Injectable } from '@angular/core';
import {Dish, Order} from "../dish";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AuthenticationService} from "./authentication.service";
import {DatePipe} from "@angular/common";
import {Client, Perf} from "../user";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  dishesRef: AngularFirestoreCollection<Dish>
  userRef: AngularFirestoreDocument<Client>
  sharedData:string ='$';
  amount:number = 0;
  orderCount:number=0;
  maxPrice?:number;
  minPrice?:number;
  downPrice?:number;
  upPrice?: number;
  size:number = 6;
  page:number = 1;
  myOrders:Order[] = [];
  kitchens ?: Set<String>;
  categories ?: Set<String>;
  basketOrders:Set<Order> = new Set();
  filter:any[] = [];
  stars:number[] = [1,2,3,4,5];
  currDish:Dish | undefined;
  constructor(private db: AngularFirestore, private auth:AuthenticationService, public datepipe: DatePipe) {
    this.dishesRef = db.collection("/dishes1")
    this.getDishes()
    for (let i = 0; i <3; i++){
      this.filter.push(new Set());
    }
    /// local storage wystarczy
    this.auth.afAuth.authState.subscribe(
        auth => {
          if(auth){
            this.userRef = db.doc(`/users/${auth.uid}`)
            this.userRef.collection("currOrders").get().subscribe(snap => snap.forEach(doc => {
              let order : Order = this.myOrders.find(ord => ord.dish.id === doc.id)!
              this.basketOrders.add(order!);
              order.instock = doc.get("units")
              this.amount += order.dish.price * order.instock;
              this.orderCount += order.instock;
            }))
        }})
    }

  getDishes(): void {
    this.dishesRef.snapshotChanges().pipe(map(changes =>
        changes.map(c =>
          //@ts-ignore
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
        this.kitchens = new Set();
          this.categories = new Set();
          this.maxPrice = 0;
          this.minPrice = 1000;
          this.myOrders = data.map(dish => new Order(dish));
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
  createDish(dish:Dish):void {
    this.dishesRef.add(dish)
  }
  deleteDish(order:Order): void {
    this.dishesRef.doc(order.dish.id).delete()
      .then(() =>this.getDishes())
      .catch(err => console.log(err));
  }
  updateDish(id:string,data:any): void {
    this.dishesRef.doc(id).update(data).catch(err => console.log(err));
  }
  currencyRate(price:number):number{
    if (this.sharedData == '$') return price;
    else return Math.round(price*0.9*100)/100;
  }
  add(order:Order):void{
    order.instock += 1;
    this.amount += order.dish.price;
    this.orderCount += 1;
    if(!this.basketOrders.has(order)) {
      this.basketOrders.add(order);
    }
    this.userRef.collection("currOrders").doc(order.dish.id).set({name: order.dish.name, units: order.instock},{merge:true})
  }
  substract(order:Order):void{
    order.instock -= 1;
    this.amount -= order.dish.price;
    this.orderCount -= 1;
    this.userRef.collection("currOrders").doc(order.dish.id).set({name: order.dish.name, units: order.instock},{merge:true})
    if(order.instock == 0) {
      this.basketOrders.delete(order);
      this.userRef.collection("currOrders").doc(order.dish.id).delete()
    }
  }
  getOpinions(id:string){
    return this.dishesRef.doc(id).collection("opinions")
  }
  realizeOrder():void{
    let date = this.datepipe.transform(new Date(),'yyyy-MM-dd hh:mm')!
    for(let order of this.basketOrders){
      this.userRef.collection("pastOrders").doc(order.dish.id).ref.get()
        .then(data => { if(!data.exists) this.userRef.collection("pastOrders").doc(order.dish.id).set({name:order.dish.name, rate : 0,id:order.dish.id},{merge:true}) })
      let temp : Perf = {units:order.instock, date :date}
      this.userRef.collection("pastOrders").doc(order.dish.id).collection("howmany").add(temp)
      this.userRef.collection("currOrders").doc(order.dish.id).delete()
      order.dish.units -= order.instock
      order.instock = 0
      this.dishesRef.doc(order.dish.id).update({units:order.dish.units})
    }
    this.basketOrders.clear()
    this.amount = 0
    this.orderCount = 0
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
}
