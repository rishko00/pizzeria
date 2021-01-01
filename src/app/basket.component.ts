import { Component } from '@angular/core';
import { BasketService } from './basket.service';


@Component({
  selector: 'basket',
  template: `
  <div *ngFor="let i of basketItems"><img src="{{ i.item.image }}"> <span>
  {{ i.item.name }}<br>
  {{ i.item.info }}<br>
  <span *ngFor="let j of i.item.ingredients"> {{ j.name }}</span><br>
  {{ i.totalPrice }}<br></span></div>
  <div>Сума замовлення: {{getTotalPrice()}}</div>
  <button (click)="toOrder()">OK</button>`,
  styles: [`
  img{
    width: 200px;
    height: 200px;
  }`]
})

export class BasketComponent {
  basketItems: Object[] = this.basket.getItems();

  constructor(private basket: BasketService){ }

  getTotalPrice(){
    let sum = 0;
    for(let i of this.basketItems){
      sum += i['totalPrice'];
    }
    return sum;
  }

  toOrder(){}
}
