import { Component, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { BasketService } from './basket.service';
import { Pizza, Ingredient, BasketItem } from './models'

/* class Pizza{
  name: string;
  info: string;
  price: Object;
  image: string;
  defaultSize: string;
  ingredients: Ingredient[];

  constructor(name, info, price, image, ingredients, defaultSize){
    this.name = name;
    this.info = info;
    this.image = image;
    this.price = price;
    this.ingredients = ingredients;
    this.defaultSize = defaultSize;
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
 */
@Component({
  selector: 'pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})

export class PizzaComponent {
  pizza: Pizza[] = [];
  showPizza: Pizza;
  basketitem: BasketItem = new BasketItem(new Pizza('','',{}), 0, 1);
  ingredients: Ingredient[] = [];

  constructor(private http: HttpClient, private basket: BasketService) { }

  getPizza(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let pizzaList = data['Pizza'];
      return pizzaList.map((pizza: any) => {
        return new Pizza(pizza.name, pizza.image, pizza.prices);
        /* return {name: pizza.name, info: pizza.info, prices: pizza.price, image: pizza.image, size: Object.keys(pizza.price)[0], price: pizza.price[Object.keys(pizza.price)[0]], ingredients: [] } */
      })
    }))
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let ingrList = data['Інгредієнти'];
      return ingrList.map((ingr: any) => {
        return {name: ingr.name, price: ingr.price, image: ingr.image, constructorImage: ingr.constructorImage}
      })
    }))
  }

  ngOnInit(){
    this.getPizza().subscribe((data) => this.pizza = data);
    this.getIngredients().subscribe((data) => this.ingredients = data);
    for(let i of this.pizza){
      document.getElementById(i.name + ' ' + '22 cm').classList.add('sizebtnchecked');
    }
  }

  setSize(p: Pizza, size: string){
    /* for(let i of this.pizza){
      if(i == p){
        i.setSize(size);
      }
    } */
    let a = new Pizza('', '', {})
    a.gop();

    console.log(this.pizza[0] instanceof Pizza);
    console.log(a instanceof Pizza);
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
    }
  }

  addIngredient(i: Ingredient){
    for(let p of this.pizza){
      if(p == this.showPizza){
        let index = p.ingredients.findIndex(el => i == el);
        if(index != -1 && p.ingredients[index].count < 5) {
          p.ingredients[index].count++;
          this.basketitem.totalPrice += i.price;
        }
        else if (index != -1){
          p.ingredients.push(i);
          this.basketitem.totalPrice += i.price;
        }
      }
    }
  }

  deleteIngredient(i: Ingredient){
    for(let p of this.pizza){
      if(p == this.showPizza){
        let index = p.ingredients.findIndex(el => i == el);
        if(index != -1){
          if(p.ingredients[index].count == 1) p.ingredients.splice(index, 1);
          else p.ingredients[index].count--;
          this.basketitem.totalPrice -= i.price;
        }
      }
    }
  }

/*   addToOrder(i){
    if(i.price instanceof Object){
      this.order.item = i;
      this.order.totalPrice += i.price[i.defaultSize];
    }
    else {
      this.order.item['ingredients'].push(i);
      this.order.totalPrice += i.price;
    }
  }
 */
  addPizzaToBasket(pizza: Pizza){
    this.basketitem.item = pizza;
    this.basketitem.totalPrice += pizza.price;
    for(let i of this.pizza){
      if(i == pizza && i.ingredients){
        let sum = i.ingredients
      }
    }
    //this.basket.add(this.basketitem);
  }
/* 
  deleteFromOrder(i){
    if(this.getCountOfItems(i)){
      let c = this.order.item['ingredients'].findIndex(el => el == i);
      this.order.item['ingredients'].splice(c, 1);
      this.order.totalPrice -= i.price;
    }
  } */

}
