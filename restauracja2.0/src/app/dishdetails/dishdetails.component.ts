import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CurrencyService} from "../services/currency.service";
import {Order} from "../dish";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";import {AuthenticationService} from "../services/authentication.service";
import {Opinion} from "../opinion";
import {Roles} from "../user";
@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {
  order:Order
  opinions : Opinion[]
  canRate : boolean = false
  rate : number
  canCom : boolean = false
  opinionForm= new FormGroup({
    nick: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    body: new FormControl('',[Validators.required,Validators.minLength(50),Validators.maxLength(500)]),
    date: new FormControl('')
  })
  constructor(private route:ActivatedRoute, public service : CurrencyService,
              public location:Location, public auth : AuthenticationService) {}
  userid : string
  banned : boolean
  roles : Roles
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userid = JSON.parse(localStorage.getItem("user")!).uid!
    this.banned = JSON.parse(localStorage.getItem("banned")!)
    this.roles = JSON.parse(localStorage.getItem("roles")!)
    this.service.dishesRef.doc(id).valueChanges().subscribe((data:any) => this.order = new Order(data))
    this.service.getOpinions(id).valueChanges().subscribe((data:any) => this.opinions = data, error => console.log(error))
    this.auth.getClientData(this.userid).collection("pastOrders").doc(id).get().subscribe(data => {
      if (data.exists) {
        this.rate = data.get("rate");
        this.canRate = !this.banned || this.roles.manager || this.roles.admin
        this.canCom = (!this.banned && !this.roles.manager) || this.roles.admin
      }
      else {
        this.canRate = this.roles.admin
        this.canCom = this.roles.manager ||  this.roles.admin
      }},
      error => console.log(error))

  }
  get nick() {return this.opinionForm.get('nick')!;}
  get title() {return this.opinionForm.get('title')!;}
  get body() {return this.opinionForm.get('body')!;}
  updateRate(rate:number){
    let av = this.order.dish.ratedby * this.order.dish.rate
    av += rate;
    av = Math.floor(av/(this.order.dish.ratedby + 1))
    this.order.dish.ratedby += 1
    this.order.dish.rate = av
    this.service.updateDish(this.order.dish.id,this.order.dish)
    this.rate = rate
    this.auth.getClientData(this.userid).collection("pastOrders").doc(this.order.dish.id).update({rate:rate})
  }
  addOpinion(data:any){
    this.service.dishesRef.doc(this.order.dish.id).collection("opinions").add(data)
  }
}
