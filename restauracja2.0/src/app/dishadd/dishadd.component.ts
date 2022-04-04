import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormArray, FormGroup} from "@angular/forms";
import { Validators} from "@angular/forms";
import {CurrencyService} from "../services/currency.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dishadd',
  templateUrl: './dishadd.component.html',
  styleUrls: ['./dishadd.component.css']
})
export class DishaddComponent implements OnInit {
  dishForm : FormGroup
  constructor(private builder: FormBuilder, public service : CurrencyService,public location:Location) {
    this.dishForm = this.builder.group({
      name:[service.currDish ? service.currDish.name : null,Validators.required],
      images: this.builder.array([
        this.builder.control(null),
        this.builder.control(null),
        this.builder.control(null)
      ],),
      units:[service.currDish ? service.currDish.units : null,[Validators.required,Validators.min(1),Validators.max(50)]],
      price:[service.currDish ? service.currDish.price : null,[Validators.required,Validators.min(5),Validators.max(40)]],
      description:[(service.currDish ? service.currDish.description : null),[Validators.required,Validators.minLength(50),Validators.maxLength(500)]],
      kuchnia:[service.currDish ? service.currDish.kuchnia : null,[Validators.required,Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$')]],
      kategoria:[service.currDish ? service.currDish.kategoria : null,[Validators.required,Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$')]],
      skladniki: this.builder.array([
        this.builder.control(null),
        this.builder.control(null),
        this.builder.control(null)
      ])
    })
  }
  get skladniki() {return this.dishForm.get('skladniki')! as FormArray;}
  get images() {return this.dishForm.get('images')! as FormArray;}
  get name(){return this.dishForm.get('name')!}
  get units() {return this.dishForm.get('units')!}
  get price() {return this.dishForm.get('price')!}
  get description(){return this.dishForm.get('description')!}
  get kuchnia(){return this.dishForm.get('kuchnia')!}
  get kategoria(){return this.dishForm.get('kategoria')!}
  addIngredient(array:FormArray) {
    array.push(this.builder.control(null));
  }
  deleteIngredient(array:FormArray){
    array.removeAt(-1);
  }
  ngOnInit(): void {
  }
  updateDish(data:any){
    if(!this.service.currDish) {
      this.service.createDish({rate:0,ratedby:0,...data});
      this.dishForm.reset()
    }
    else {
      let dish = {
        name : data.name,
        units : data.units,
        description : data.description,
        price : data.price,
        kategoria : data.kategoria,
        kuchnia : data.kuchnia,
        skladniki : data.skladniki,
        images : data.images
      }
      this.service.updateDish(this.service.currDish.id, dish)
    }
  }

}
