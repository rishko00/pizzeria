import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { BasketComponent } from '.pages/basket/basket.component';
import { ConstructorComponent } from '.pages/constructor/constructor.component';
import { BasketService } from '.core/services/basket.service';
import { DataService } from '.core/services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthComponent } from './pages/auth-admin/auth-admin.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SnackComponent } from './pages/snacks/snacks.component'; 
import { PotatoComponent } from './pages/potato/potato.component';
import { SauceComponent } from './pages/sauces/sauce.component';
import { DrinksComponent } from './pages/drinks/drinks.component';

import { FormsModule, ReactiveFormsModule, NgModel, NgForm, FormGroup, FormControl, Validators  } from '@angular/forms';

let firebaseConfig = {
  apiKey: "AIzaSyDYEr4fNYYIDy-XNIk8g4Uht-WVJtmFPkE",
  authDomain: "pizzeria-ec9c3.firebaseapp.com",
  databaseURL: "https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pizzeria-ec9c3",
  storageBucket: "pizzeria-ec9c3.appspot.com",
  messagingSenderId: "787384411897",
  appId: "1:787384411897:web:a62ec4be96f07253496428"
};

@NgModule({
  declarations: [
    AppComponent, PizzaComponent, BasketComponent, ConstructorComponent, AuthComponent, AdminComponent, SnackComponent,
    PotatoComponent, SauceComponent, DrinksComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [BasketService, DataService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
