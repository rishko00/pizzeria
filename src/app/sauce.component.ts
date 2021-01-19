import { Component } from '@angular/core';
import { DataService } from './data.service';
import { BasketService } from './basket.service';
import { Product, BasketItem } from './models';

@Component({
  selector: 'snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.css']
})

export class SauceComponent {
  sauces: Product[] = [];

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
    this.data.getProducts('Соуси').subscribe((data) => {
      for(let i of data){
        this.sauces.push(new Product(i.name, i.price,  i.image));
      }
    });
  }

  addToBasket(sauce: Product){
    let basketitem = new BasketItem(sauce, sauce.price, 1);
    this.basket.add(basketitem);
  }
}