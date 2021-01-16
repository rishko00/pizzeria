import { Component, ElementRef } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem, Order } from './models';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent {
  myForm: FormGroup;
  basketItems: Object[] = this.basket.getItems();
  user: string;
  address: string;
  phoneNumber: string;

  constructor(private basket: BasketService, private http: HttpClient){
    this.myForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.pattern("^[A-Z][a-z]*'?[a-z]+((-| )[A-Z]+'?[a-z]+){0,2}$")]),
      'address': new FormControl("", [Validators.required]),
      'phoneNumber': new FormControl("", [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")])
    })
  }

  showOrderForm(){
    document.getElementById('order').style.display = 'flex';
  }

  hideOrderForm(event){
    if(event.target.id == 'order' || event.target.id == 'orderbtn'){
      document.getElementById('o').style.display = 'none';
    }
  }

  getTotalPrice(){
    let sum = 0;
    for(let i of this.basketItems){
      sum += i['totalPrice'];
    }
    return sum;
  }

  toOrder() {
    let order = new Order(this.basket.getItems(), this.user, this.address, this.phoneNumber, new Date(), false);
    this.http.post('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/Orders.json', order) .subscribe((val) => {
      console.log("POST call successful value returned in body", val);
    });
  }

  deleteOrder(o: BasketItem){
    this.basket.delete(o);
  }

  incrOrder(o: BasketItem, act: string){
    this.basket.incOrder(o, act);
  }
}
