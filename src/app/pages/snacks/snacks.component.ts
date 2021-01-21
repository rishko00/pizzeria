import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { BasketService } from 'core/services/basket.service';
import { ProductWithChoise, BasketItem } from './core/models/models';

@Component({
  selector: 'snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.css']
})

export class SnackComponent {
  snacks: ProductWithChoise[] = [];

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
    this.data.getProductsWithChoise('Снеки').subscribe((data) => {
      for(let i of data){
        this.snacks.push(new ProductWithChoise(i.name, i.image, i.prices));
      }
    });
  }

  setSize(snack: ProductWithChoise, size: string){
    for(let i of this.snacks){
      if(i == snack){
        i.setSize(size);
      }
    }

    document.getElementById(snack.name + ' ' + size).classList.add('sizebtnchecked');
    for(let i in snack.prices){
      if(i != size) document.getElementById(snack.name + ' ' + i).classList.remove('sizebtnchecked');
    }
  }

  addToBasket(snack: ProductWithChoise){
    let basketitem = new BasketItem(snack, snack.price, 1);
    this.basket.add(basketitem);
  }
}