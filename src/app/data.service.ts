import { Pizza, Ingredient, BasketItem, PizzaBase } from './models';
import { Injectable } from  '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
    providedIn:  'root'
})

export class DataService{
  constructor(public http: HttpClient){}

  getPizza(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let pizzaList = data['Pizza'];
      return pizzaList.map((pizza: any) => {
        return {name: pizza.name, info: pizza.info, prices: pizza.price, image: pizza.image }
      })
    }))
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let ingrList = data['Інгредієнти'];
      return ingrList.map((ingr: any) => {
        return {name: ingr.name, price: ingr.price, image: ingr.image, constructorImage: ingr.constructorImage}
      })
    }))
  }

  getPizzaBase(): Observable<PizzaBase[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let baseList = data['Основи'];
      return baseList.map((base: any) => {
        return {name: base.name, prices: base.price, image: base.constructorImage }
      })
    }))
  }
}