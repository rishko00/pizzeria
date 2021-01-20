import { Component } from '@angular/core';
import { DataService } from './core/services/data.service';
import { BasketService } from './core/services/basket.service';
import { ProductWithChoise, BasketItem } from './core/models/models';

@Component({
  selector: 'potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.css']
})

export class PotatoComponent {
  potato: ProductWithChoise[] = [];

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
    this.data.getProductsWithChoise('Картопля').subscribe((data) => {
      for(let i of data){
        this.potato.push(new ProductWithChoise(i.name, i.image, i.prices));
      }
    });
  }

  setSize(p: ProductWithChoise, size: string){
    for(let i of this.potato){
      if(i == p){
        i.setSize(size);
      }
    }

    document.getElementById(p.name + ' ' + size).classList.add('sizebtnchecked');
    for(let i in p.prices){
      if(i != size) document.getElementById(p.name + ' ' + i).classList.remove('sizebtnchecked');
    }
  }

  addToBasket(p: ProductWithChoise){
    let basketitem = new BasketItem(p, p.price, 1);
    this.basket.add(basketitem);
  }
}