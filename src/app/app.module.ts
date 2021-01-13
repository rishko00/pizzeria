import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza.component';
import { BasketComponent } from './basket.component';
import { ConstructorComponent } from './constructor.component';
import { BasketService } from './basket.service';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

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
    AppComponent, PizzaComponent, BasketComponent, ConstructorComponent,AngularFireModule,
    AngularFireAuthModule
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [BasketService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
