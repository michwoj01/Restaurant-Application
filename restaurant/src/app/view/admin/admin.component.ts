import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Client} from "../../user";
import {map} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users:Client[]
  constructor(public auth : AuthenticationService) {
    this.getUsers()
  }

  ngOnInit(): void {
  }
  changePers(option:string){
    this.auth.setPersistance(option)
  }
  getUsers(){
    this.auth.getUsers().snapshotChanges().pipe(map(changes => changes.map(c =>
          //@ts-ignore
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ))).subscribe(data => this.users = data)
  }
  updateUser(user:Client){
    this.auth.updateUser(user)
  }
}
