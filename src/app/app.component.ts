import { Component, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';


class Pizza{
  name: string;
  info: string;
  price: Object;
  image: string;
  defaultSize: string;

  constructor(name, info, price, image){
    this.name = name;
    this.info = info;
    this.image = image;
    this.price = price;
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
  items: Object[];
  totalPrice: number;
  count: number;

  constructor(items, totalPrice, count){
    this.items = items;
    this.totalPrice = totalPrice;
    this.count = count;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pizza: Pizza[] = [];
  showPizza: Pizza = new Pizza('','',{},'');
  order: Order = new Order([], 0, 0);
  countOfOrders: number = JSON.parse(localStorage.getItem('Order')).length;
  totalPrice: number;
  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private el: ElementRef) { }

  getPizza(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let pizzaList = data['Pizza'];
      return pizzaList.map((pizza: any) => {
        return {name: pizza.name, info: pizza.info, price: pizza.price, image: pizza.image, defaultSize: '22 cm'}
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
    this.order.items = [p];
  }

  showIngredients(p: Pizza){
    this.showPizza = p;
    this.order.totalPrice = p.price[p.defaultSize];
    this.order.items = [p];
    document.getElementById('ingr').style.display = 'block';
  }

  addToOrder(item){
    this.order.items.push(item);

    if(item.price instanceof Object){
      this.order.totalPrice += item.price[item.defaultSize];
    }
    else this.order.totalPrice += item.price;
  }

  addPizzaToBasket(){
    let obj = new Array();
    let data = JSON.parse(localStorage.getItem('Order'));
    if(data == null){
      obj.push(this.order);
      localStorage.setItem('Order', JSON.stringify(obj));
    }

    else{
      this.order.items.sort((a, b) => a['name'] > b['name'] ? 1 : -1);
      for(let i of data){
        i.items.sort((a, b) => a['name'] > b['name'] ? 1 : -1);
        if(JSON.stringify(i.items) == JSON.stringify(this.order.items)){
          i.count++;
          localStorage.setItem(`Order`, JSON.stringify(data));
          return;
        }
      }

      data.push(this.order);
      localStorage.setItem(`Order`, JSON.stringify(data));
      this.countOfOrders++;
    } 
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
