import { Component} from '@angular/core';
import { DataService } from './data.service';
import { BasketService } from './basket.service';
import { Pizza, Ingredient, BasketItem } from './models';

@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})

export class PizzaComponent {
  pizza: Pizza[] = [];
  showPizza: Pizza;
  basketitem: BasketItem = new BasketItem(new Pizza('','',{}, ''), 0, 1);
  ingredients: Ingredient[] = [];

  constructor(private data: DataService, private basket: BasketService) { }

  ngOnInit(){
    this.data.getPizza().subscribe((data) => {
      for(let i of data){
        this.pizza.push(new Pizza(i.name, i.image, i.prices, i.info));
      }
    });

    this.data.getIngredients().subscribe((data) => {
      for(let i of data){
        this.ingredients.push(new Ingredient(i.name, i.price, i.image, i.constructorImage));
      }
    });
  }

  setSize(p: Pizza, size: string){
    for(let i of this.pizza){
      if(i == p){
        i.setSize(size);
        i.ingredients = [];
        if(this.basketitem.item == p) {
          this.basketitem.item = i;
          this.basketitem.totalPrice = i.price;
        } 
      }
    }

    document.getElementById(p.name + ' ' + size).classList.add('sizebtnchecked');
    for(let i in p.prices){
      if(i != size) document.getElementById(p.name + ' ' + i).classList.remove('sizebtnchecked');
    }
  }

  showIngredients(p: Pizza){
    this.showPizza = p;
    this.basketitem.totalPrice = p.price;
    this.basketitem.item = p;
    document.getElementById('ingr').style.display = 'flex';
  }

  hideIngredients(event){
    if(event.target.id == 'ingr' || event.target.id == 'basketbtn'){
      document.getElementById('ingr').style.display = 'none';
      this.showPizza.ingredients = [];
      this.showPizza = new Pizza('', '', {}, '');
      console.log(this.showPizza);
      this.basketitem.item = new Pizza('', '', {}, '');
      this.basketitem.totalPrice = 0;
    }
  }

  addIngredient(i: Ingredient){
    if(this.showPizza.getCountOfIngredient(i) < 5) {
      this.showPizza.ingredients.push(i);
      this.basketitem.totalPrice += i.price;
    }
  }

  deleteIngredient(i: Ingredient){
    let index = this.showPizza.ingredients.findIndex(el => i == el);
    if(index != -1){
      this.showPizza.ingredients.splice(index, 1);
      this.basketitem.totalPrice -= i.price;
    }
  }

  addPizzaToBasket(pizza?: Pizza){
    if(pizza) {
      this.basketitem.item = pizza;
      this.basketitem.totalPrice = pizza.price;
    }
    this.basket.add(this.basketitem);
  }
}
