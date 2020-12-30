import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza.component';
import { BasketService } from './basket.service';

@NgModule({
  declarations: [
    AppComponent, PizzaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasketService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
