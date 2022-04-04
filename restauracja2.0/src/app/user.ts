import {AngularFirestoreCollection} from "@angular/fire/compat/firestore";

export interface Client{
  name:string;
  roles:Roles;
  pastOrders:AngularFirestoreCollection<pastOrder>;
  currOrders:AngularFirestoreCollection<currOrder>;
  banned:boolean;
}
export interface Roles{
  admin:boolean;
  manager:boolean;
  client:boolean;
}
export interface currOrder{
  name:string;
  units:number;
}
export interface pastOrder{
  id:string
  name:string
  howmany:Perf[]
  rate:number;
}
export interface Perf{
  date:string;
  units:number;
}
