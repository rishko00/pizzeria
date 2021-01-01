import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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
  selector: 'basket',
  template: `
  <div *ngFor="let i of basketItems"><img src="{{ i.item.image }}"> <span>
  {{ i.item.name }}<br>
  {{ i.item.info }}<br>
  <span *ngFor="let j of i.item.ingredients"> {{ j.name }}</span><br>
  {{ i.totalPrice }}<br></span></div>
  <div>Сума замовлення: {{getTotalPrice()}}</div>
  
    User: <input [(ngModel)]="user">
    Address: <input [(ngModel)]="address">
    Number: <input [(ngModel)]="phoneNumber">
    <button (click)="toOrder()">OK</button>
  `,
  styles: [`
  img{
    width: 200px;
    height: 200px;
  }`]
})

export class BasketComponent {
  basketItems: Object[] = this.basket.getItems();
  user: string;
  address: string;
  phoneNumber: string;
  date: Date = new Date();

  constructor(private basket: BasketService, private http: HttpClient){ }

  getTotalPrice(){
    let sum = 0;
    for(let i of this.basketItems){
      sum += i['totalPrice'];
    }
    return sum;
  }

  toOrder() {
    let order = new ToOrder(this.basketItems, this.user, this.address, this.phoneNumber, this.date);

    this.http.post('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', o) .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
    console.log(JSON.stringify(order))
  }
}
