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
import { KitchenPipe } from './kitchen.pipe';
import { CategoryPipe } from './category.pipe';
import { PricePipe } from './price.pipe';
import { RatePipe } from './rate.pipe';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';
import {CurrencyService} from "./currency.service";
import { PaginatorComponent } from './paginator/paginator.component';
import { PaginatePipe } from './paginate.pipe';
import {HttpClientModule} from "@angular/common/http";

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
    PaginatePipe
  ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
