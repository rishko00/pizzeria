import { Component, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';


class Pizza{
  name: string;
  info: string;
  price: Object;
  image: string;
  defaultSize: string;
  ingredients: Ingredient[];

  constructor(name, info, price, image, ingredients){
    this.name = name;
    this.info = info;
    this.image = image;
    this.price = price;
    this.ingredients = ingredients;
  }
}

class Ingredient{
  name: string;
  price: number;
  image: string;

  constructor(name, price, image){
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Order{
  item: Pizza;
  totalPrice: number;
  count: number;

  constructor(item, totalPrice, count){
    this.item = item;
    this.totalPrice = totalPrice;
    this.count = count;
  }
}

@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})

export class PizzaComponent {
  pizza: Pizza[] = [];
  showPizza: Pizza = new Pizza('','',{},'', []);
  order: Order = new Order(new Pizza('','',{},'', []), 0, 0);
  totalPrice: number;
  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private basket: BasketService) { }

  getPizza(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let pizzaList = data['Pizza'];
      return pizzaList.map((pizza: any) => {
        return {name: pizza.name, info: pizza.info, price: pizza.price, image: pizza.image, defaultSize: '22 cm', ingredients: []}
      })
    }))
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let ingrList = data['Інгредієнти'];
      return ingrList.map((ingr: any) => {
        return {name: ingr.name, price: ingr.price, image: ingr.image}
      })
    }))
  }

  ngOnInit(){
    this.getPizza().subscribe((data) => this.pizza = data);
    this.getIngredients().subscribe((data) => this.ingredients = data);
  }

  setSize(p: Pizza, size: string){
    for(let i of this.pizza){
      if(i == p){
        i.defaultSize = size;
      }
    }
    this.order.totalPrice = p.price[p.defaultSize];
    this.order.item = p;
  }

  showIngredients(p: Pizza){
    this.showPizza = p;
    this.order.totalPrice = p.price[p.defaultSize];
    this.order.item = p;
    document.getElementById('ingr').style.display = 'block';
  }

  addToOrder(item){
    if(item.price instanceof Object){
      this.order.item = item;
      this.order.totalPrice += item.price[item.defaultSize];
    }
    else {
      this.order.item['ingredients'].push(item);
      this.order.totalPrice += item.price;
    }
  }

  addPizzaToBasket(){
    this.basket.add(this.order)
  }

  deleteFromOrder(item){
    let i = this.order.items.findIndex(el => el == item);
    if(item.price instanceof Object && this.getCountOfItems(item) == 1) return;
    else if (i == -1) return;

    else{
      this.order.items.splice(i, 1);
      
      if(item.price instanceof Object){
        this.order.totalPrice -= item.price[item.defaultSize];
      }
      else this.order.totalPrice -= item.price;
    }
  }

  getCountOfItems(i){
    return this.order.items.filter(item => item == i).length;
  }
}
