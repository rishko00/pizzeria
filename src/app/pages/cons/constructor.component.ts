import { Component, Renderer2 } from '@angular/core';	
import { DataService } from './core/services/data.service';	
import { Pizza, Ingredient, BasketItem, PizzaBase } from './core/models/models';	
import { BasketService } from 'core/services/basket.service';	

@Component({	
  selector: 'constructor',	
  templateUrl: './constructor.component.html',	
  styleUrls: ['./constructor.component.css']	
})	

export class ConstructorComponent {	
  ingredients: Ingredient[] = [];	
  pizzaBase: PizzaBase[] = [];	
  pizza: Pizza = new Pizza('Ваш шедевр','https://cdn10.arora.pro/f/upload/f81d1064-1337-4bbf-a894-909133be0aa2/file_manager/theme/no-photo-small.jpg', {}, '');	
  order: BasketItem = new BasketItem(this.pizza, 0, 1);	
  z: number = 0;	

  constructor(private data: DataService, private basket: BasketService, private renderer: Renderer2){ }	

  ngOnInit(){	
    this.data.getIngredients().subscribe((data) => {	
      for(let i of data){	
        this.ingredients.push(new Ingredient(i.name, i.price, i.image, i.constructorImage));	
      }	
    });	
  }
}