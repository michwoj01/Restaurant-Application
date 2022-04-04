import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormArray } from "@angular/forms";
import { Validators} from "@angular/forms";
import { CurrencyService} from "../currency.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dishadd',
  templateUrl: './dishadd.component.html',
  styleUrls: ['./dishadd.component.css']
})
export class DishaddComponent implements OnInit {
  dishForm= this.builder.group({
    name:['',Validators.required],
    images: this.builder.array([
        this.builder.control(''),
        this.builder.control(''),
        this.builder.control('')
      ],),
    units:['',[Validators.required,Validators.min(1),Validators.max(50)]],
    price:['',[Validators.required,Validators.min(5),Validators.max(40)]],
    description:['',[Validators.required,Validators.minLength(50),Validators.maxLength(500)]],
    kuchnia:['',[Validators.required,Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$')]],
    kategoria:['',[Validators.required,Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*$')]],
    skladniki: this.builder.array([
      this.builder.control(''),
      this.builder.control(''),
      this.builder.control('')
    ])
  })
  constructor(private builder: FormBuilder, public service : CurrencyService,public location:Location) { }
  get skladniki() {return this.dishForm.get('skladniki')! as FormArray;}
  get images() {return this.dishForm.get('images')! as FormArray;}
  get name(){return this.dishForm.get('name')!}
  get units() {return this.dishForm.get('units')!}
  get price() {return this.dishForm.get('price')!}
  get description(){return this.dishForm.get('description')!}
  get kuchnia(){return this.dishForm.get('kuchnia')!}
  get kategoria(){return this.dishForm.get('kategoria')!}
  addIngredient(array:FormArray) {
    array.push(this.builder.control(''));
  }
  deleteIngredient(array:FormArray){
    array.removeAt(-1);
  }
  ngOnInit(): void {
  }

}
