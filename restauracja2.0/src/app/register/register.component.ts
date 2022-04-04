import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string | undefined;
  myForm:FormGroup;
  constructor(private auth:AuthenticationService,
              private fb : FormBuilder,
              private router: Router) {
    this.myForm = fb.group({
      email: ['',[Validators.email,Validators.required]],
      login:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]],
      cnfpass: ['',Validators.required]
    });
    this.myForm.controls['password'].valueChanges.subscribe(() => this.myForm.controls['cnfpass'].updateValueAndValidity());
  }
  ngOnInit(): void {
  }
  isValid(controlName:string) {
    return this.myForm.get(controlName)!.invalid && this.myForm.get(controlName)!.touched;
  }
  register() {
    if (this.myForm.valid) this.auth.SignUpUser(this.myForm.value)
  }
}
