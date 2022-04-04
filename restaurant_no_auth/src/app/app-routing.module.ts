import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DishesComponent} from "./dishes/dishes.component";
import {BasketComponent} from "./basket/basket.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {DishaddComponent} from "./dishadd/dishadd.component";
import {DishdetailsComponent} from "./dishdetails/dishdetails.component";

const routes: Routes = [
  { path: 'dishes', component: DishesComponent  },
  {path: 'basket', component:BasketComponent},
  {path:'home', component:WelcomeComponent},
  {path:'add',component:DishaddComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'dish/:id',component: DishdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
