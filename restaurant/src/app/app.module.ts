import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DishaddComponent } from './dishadd/dishadd.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BasketComponent } from './basket/basket.component';
import { FiltersComponent } from './filters/filters.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';
import {CurrencyService} from "./services/currency.service";
import { PaginatorComponent } from './paginator/paginator.component';
import {PaginatePipe} from "./paginator/paginate.pipe";
import {CategoryPipe} from "./pipes/category.pipe";
import {KitchenPipe} from "./pipes/kitchen.pipe";
import {PricePipe} from "./pipes/price.pipe";
import {RatePipe} from "./pipes/rate.pipe";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { AuthenticationService } from "./services/authentication.service";
import { AdminComponent } from './view/admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import {DatePipe} from "@angular/common";
import { UserComponent } from './view/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    NavbarComponent,
    DishaddComponent,
    BasketComponent,
    FiltersComponent,
    KitchenPipe,
    CategoryPipe,
    PricePipe,
    RatePipe,
    WelcomeComponent,
    DishdetailsComponent,
    PaginatorComponent,
    PaginatePipe,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ManagerComponent,
    UserComponent
  ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,

    ],
  providers: [CurrencyService,AuthenticationService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
