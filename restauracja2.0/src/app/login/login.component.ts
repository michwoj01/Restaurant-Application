import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private auth: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['',Validators.email],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  isValid(controlName:string) {
    return this.loginForm.get(controlName)!.invalid && this.loginForm.get(controlName)!.touched;
  }
  login() {
    if (this.loginForm.valid) this.auth.SignInUser(this.loginForm.value)
  }
}
