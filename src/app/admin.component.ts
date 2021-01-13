import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { AuthService } from './auth.service';
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

class ToOrder{
  items: Order[];
  totalPrice: number;
  user: string;
  address: string;
  phoneNumber: string;
  date: Date;

  constructor(items, user, address, phoneNumber, date){
    this.address = address;
    this.items = items;
    this.user = user;
    this.phoneNumber = phoneNumber;
    this.date = date;
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice(){
    let sum = 0;
    for(let i of this.items){
      sum += i['totalPrice'];
    }
    return sum;
  }
}

@Component({
  selector: 'app-root',
  template: `
  <a href="#"> hellloooo</a>
  <div>
    {{ orders }}
  </div>
  <button (click)="auth.logout()">exit</bu
  `,
  styles: ['./app.component.css']
})

export class AdminComponent {
  orders: Object;

  constructor(private basket: BasketService, private auth: AuthService, private http: HttpClient){}
  ngOnInit(){
    this.getOrders().subscribe((data) => this.orders = data);
    console.log(this.orders)
  }

  getOrders() {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data => {return data}))
  }
}