import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DishesComponent} from "./dishes/dishes.component";
import {BasketComponent} from "./basket/basket.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {DishaddComponent} from "./dishadd/dishadd.component";
import {DishdetailsComponent} from "./dishdetails/dishdetails.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./view/admin/admin.component";
import {AuthGuard  } from "./guard/auth.guard";
import {ManagerComponent} from "./manager/manager.component";
import {UserComponent} from "./view/user/user.component";
import {AdminGuard} from "./guard/admin.guard";
import {MenagerGuard} from "./guard/menager.guard";

const routes: Routes = [
  { path: 'dishes', component: DishesComponent },
  {path: 'basket', component:BasketComponent},
  {path:'home', component:WelcomeComponent},
  {path:'add',component:DishaddComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'dish/:id',component: DishdetailsComponent,canActivate:[AuthGuard]},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'admin-view', component: AdminComponent,canActivate:[AdminGuard]},
  {path: 'manager',component:ManagerComponent,canActivate:[MenagerGuard]},
  {path: 'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
