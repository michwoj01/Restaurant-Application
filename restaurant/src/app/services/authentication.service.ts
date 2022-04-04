import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Client, Roles} from "../user";
import {AngularFirestoreDocument} from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  user: any;
  persistance:string;
  roles : Roles
  username : string | null

  constructor(public afAuth: AngularFireAuth, public router : Router, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.user = auth;
          this.getClientData(auth.uid).get().subscribe((data : any) => {
            localStorage.setItem('name',JSON.stringify(data.get("name")))
            JSON.parse(localStorage.getItem('name')!)
            localStorage.setItem('banned',JSON.stringify(data.get("banned")))
            JSON.parse(localStorage.getItem('banned')!)
            localStorage.setItem('roles',JSON.stringify(data.get("roles")))
            JSON.parse(localStorage.getItem('roles')!)
            this.roles = JSON.parse(localStorage.getItem("roles")!)
            this.username =JSON.parse(localStorage.getItem("name")!)
          })
          this.getPersistance();
          localStorage.setItem('user', JSON.stringify(this.user));
          JSON.parse(localStorage.getItem('user')!)
        } else {
          localStorage.setItem('user', null!);
          JSON.parse(localStorage.getItem('user')!)
          localStorage.setItem('banned', null!);
          JSON.parse(localStorage.getItem('banned')!)
          localStorage.setItem('roles', null!);
          JSON.parse(localStorage.getItem('roles')!)
          localStorage.setItem('name', null!);
          JSON.parse(localStorage.getItem('name')!)
          this.user = null;
        }
      }
    )
  }

  SignInUser (data:any) {
    this.afAuth.signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.router.navigate(['/dishes'])
      })
      .catch((error) => { window.alert(error.message); })
  }
  SignUpUser(data:any) {
    this.afAuth.createUserWithEmailAndPassword(data.email,data.password)
      .then(cred => {
        this.createUser(cred.user!.uid,data.login);
        this.router.navigate(['/dishes'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SignOut() {
    return this.afAuth.signOut().then(()=>{
      this.router.navigate(['/home'])
      localStorage.removeItem('user');})
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  createUser(id:string,username:string){
    const clientRef:AngularFirestoreDocument = this.db.doc(`users/${id}`)
    const data = {
      name : username,
      roles : { admin:false, manager:false, client:true},
      banned : false,
    }
    clientRef.set(data,{merge:true})
  }
  getUsers():AngularFirestoreCollection<Client>{
    return this.db.collection("users")
  }
  getClientData(id:string){
    return this.db.doc(`/users/${id}`)
  }
  getPastOrders(id:string){
    return this.getClientData(id).collection("pastOrders")
  }
  getPersistance(){
    return this.db.doc("/tools/0").valueChanges().subscribe(({persistance} : any) => {
      this.afAuth.setPersistence(persistance);
      this.persistance = persistance
    })
  }
  setPersistance(option:string){
    const data = {
      persistance : option
    }
    this.db.doc("/tools/0").set(data,{merge:true})
    this.getPersistance()
  }
  updateUser(data:any){
    const user = {
      name:data.name,
      roles:data.roles,
      banned:data.banned
    }
    this.db.collection("users").doc(data.id).update(user)
  }

}
