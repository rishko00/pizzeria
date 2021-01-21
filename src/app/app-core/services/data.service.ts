import { Pizza, Ingredient, Order, Product, ProductWithChoise, PizzaBase } from '../models/models';
import { Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
    providedIn:  'root'
})

export class DataService{
  constructor(public http: HttpClient){}

  getProductsWithChoise(name: string): Observable<ProductWithChoise[]>{
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let productList = data[name];
      return productList.map((product: any) => {
        return {name: product.name, prices: product.price, image: product.image }
      })
    }))
  }

  getProducts(name: string): Observable<Product[]>{
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let productList = data[name];
      return productList.map((product: any) => {
        return {name: product.name, price: product.price, image: product.image}
      })
    }))
  }

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

  getOrders(): Observable<Object> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json').pipe(map((data: any) => { return data }));
  }
}