import { Component } from '@angular/core';
import { DataService } from '../../app-core/services/data.service';
import { BasketService } from '../../app-core/services/basket.service';
import { ProductWithChoise, BasketItem } from '../../app-core/models/models';

@Component({
  selector: 'drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})

export class DrinksComponent {
  drinks: ProductWithChoise[] = [];

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
    this.data.getProductsWithChoise('Напої').subscribe((data) => {
      for(let i of data){
        this.drinks.push(new ProductWithChoise(i.name, i.image, i.prices));
      }
    });
  }

  setSize(drink: ProductWithChoise, size: string){
    for(let i of this.drinks){
      if(i == drink){
        i.setSize(size);
      }
    }

    document.getElementById(drink.name + ' ' + size).classList.add('sizebtnchecked');
    for(let i in drink.prices){
      if(i != size) document.getElementById(drink.name + ' ' + i).classList.remove('sizebtnchecked');
    }
  }

  addToBasket(drink: ProductWithChoise){
    let basketitem = new BasketItem(drink, drink.price, 1);
    this.basket.add(basketitem);
  }
}