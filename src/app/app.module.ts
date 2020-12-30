import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PizzaComponent } from './pizza.component';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';
import { Routes, RouterModule} from '@angular/router';

const appRoutes: Routes =[
    { path: '', component: AppComponent},
    { path: 'pizza', component: PizzaComponent},
    { path: 'basket', component: BasketComponent}
];

@NgModule({
  declarations: [
    AppComponent, PizzaComponent, BasketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BasketService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
