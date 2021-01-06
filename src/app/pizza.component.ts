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
  order: Order = new Order(new Pizza('','',{},'', []), 0, 1);
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
    for(let p of this.pizza){
      this.setSize(p, '22 cm');
    }
  }

  setSize(p: Pizza, size: string){
    for(let i of this.pizza){
      if(i == p){
        i.defaultSize = size;
      }
    }
    this.order.totalPrice = p.price[p.defaultSize];
    this.order.item = p;
    this.order.item['ingredients'] = [];
    document.getElementById(p.name + ' ' + size).classList.add('sizebtnchecked');
    for(let i in p.price){
      if(i != size) document.getElementById(p.name + ' ' + i).classList.remove('sizebtnchecked');
    }
  }

  showIngredients(p: Pizza){
    this.showPizza = p;
    this.order.totalPrice = p.price[p.defaultSize];
    this.order.item = p;
    document.getElementById('ingr').style.display = 'block';
  }

  hideIngredients(event){
    if(event.target.classList){
      console.log(typeof event.target.classList);
      document.getElementById('ingr').style.display = 'none';
    }
  }

  addToOrder(i){
    if(i.price instanceof Object){
      this.order.item = i;
      this.order.totalPrice += i.price[i.defaultSize];
    }
    else {
      this.order.item['ingredients'].push(i);
      this.order.totalPrice += i.price;
    }
  }

  addPizzaToBasket(){
    this.basket.add(this.order);
  }

  deleteFromOrder(i){
    if(this.getCountOfItems(i)){
      let c = this.order.item['ingredients'].findIndex(el => el == i);
      this.order.item['ingredients'].splice(c, 1);
      this.order.totalPrice -= i.price;
    }
  }

  getCountOfItems(i){
    let count = 0;
    if(this.order.item['ingredients']){
      for(let j of this.order.item['ingredients']){
        if(i == j){
          count++;
        }
      }
    }
    return count;
  }
}
