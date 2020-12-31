import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';


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
  constructorImage: string;

  constructor(name, price, image, constructorImage){
    this.name = name;
    this.price = price;
    this.image = image;
    this.constructorImage = constructorImage;
  }
}

class PizzaBase{
  name: string;
  price: Object;
  constructorImage: string;

  constructor(name, price, constructorImage){
    this.name = name;
    this.price = price;
    this.constructorImage = constructorImage;
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
  selector: 'constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.css']
})

export class ConstructorComponent {
  ingredients: Ingredient[] = [];
  pizzaBase: PizzaBase[] = [];
  pizza: Pizza = new Pizza('Ваш шедевр', '', 0, 'https://cdn10.arora.pro/f/upload/f81d1064-1337-4bbf-a894-909133be0aa2/file_manager/theme/no-photo-small.jpg', []);
  order: Order;
  z: number = 0;

  constructor(private http: HttpClient){ }
  
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let ingrList = data['Інгредієнти'];
      return ingrList.map((ingr: any) => {
        return {name: ingr.name, price: ingr.price, image: ingr.image, constructorImage: ingr.constructorImage }
      })
    }))
  }

  getPizzaBase(): Observable<PizzaBase[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let baseList = data['Основи'];
      return baseList.map((base: any) => {
        return {name: base.name, price: base.price, constructorImage: base.constructorImage }
      })
    }))
  }

  ngOnInit(){
    this.getIngredients().subscribe((data) => this.ingredients = data);
    this.getPizzaBase().subscribe((data) => this.pizzaBase = data);
  }

  addItem(i){
    this.pizza.ingredients.push(i);
    this.z++;
    let elem = document.getElementById('pizza');
    let addelem = document.createElement('img');
    addelem.src = i['constructorImage'];
    addelem.className = 'pizzaimage';
    addelem.style.zIndex = String(this.z);
    addelem.style.position = 'absolute';
    addelem.style.width = '50%';
    addelem.style.height = '65%';
    addelem.style.float = 'right';
    elem.appendChild(addelem);
  }

  deleteItem(i){
  }
}
