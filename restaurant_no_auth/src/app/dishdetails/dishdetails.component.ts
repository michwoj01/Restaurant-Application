import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CurrencyService} from "../currency.service";
import {Order} from "../dish";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {

  order:Order | undefined;
  opinionForm= new FormGroup({
    nick: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    body: new FormControl('',[Validators.required,Validators.minLength(50),Validators.maxLength(500)]),
    date: new FormControl('')
  })

  constructor(private route:ActivatedRoute,public service : CurrencyService,public location:Location) {
    const id = this.route.snapshot.paramMap.get('id');
    service.getDishes().subscribe(() => this.order = this.service.myOrders.find(i => i.dish.id === id));
  }

  ngOnInit(): void {
  }
  updateDish(): void {
    this.service.updateDish(this.order!.dish);
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
  get nick() {return this.opinionForm.get('nick')!;}
  get title() {return this.opinionForm.get('title')!;}
  get body() {return this.opinionForm.get('body')!;}
}
