import { Component, Renderer2 } from '@angular/core';	
import { DataService } from '../../app-core/services/data.service';	
import { Pizza, Ingredient, BasketItem, PizzaBase } from '../../app-core/models/models';	
import { BasketService } from '../../app-core/services/basket.service';	

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
  this.data.getPizzaBase().subscribe((data) => {	
      for(let i of data){	
        this.pizzaBase.push(new PizzaBase(i.name, i.image, i.prices));	
      }	
    });	
  }	

  addItem(i, size?: string){	
    if(this.pizzaBase.includes(i)){	
      this.pizza.info = i.name;	
      this.pizza.size = i.size;	
      this.pizza.price = i.prices[size];	
      this.pizza.ingredients = [];	
      document.getElementById('addbutton').style.visibility = 'visible';	
      document.getElementById('price').hidden = false;	
      for (let j of document.getElementsByClassName('basebtn')){	
        j.classList.remove('basebtnchecked');	
      }	
      document.getElementById(i.name + ' ' + size).classList.add('basebtnchecked');	
    }	

    else{	
      if(this.pizza.info == ''){	
        alert('Спочатку виберіть основу піци');	
      }	
      else{	
        if(this.pizza.ingredients.length == 10){	
          alert('Максимальна кількість інгредієнтів: 10');	
        }	
        else if(this.pizza.getCountOfIngredient(i) >= 5){	
          alert('Максимальна кількість одного інгредієнта: 5');	
        }	
        else{	
          this.pizza.ingredients.push(i);	
          this.pizza.price += i.price;	
        }	
      }	
    }	

    if(i.constructorImage){	
      let elem = document.getElementById('pizza');	
      let addelem = this.renderer.createElement('img');	
      this.renderer.addClass(addelem, 'pizzaimage');	
      this.renderer.setAttribute(addelem, 'src', i.constructorImage);	
      this.renderer.appendChild(elem, addelem);	
    }	
  }	

  deleteItem(i: Ingredient){	
    if(this.pizza.ingredients.includes(i)){	
      let c = this.pizza.ingredients.findIndex(el => el == i);	
      this.pizza.ingredients.splice(c, 1);	
      this.pizza.price -= i.price;	
      let elements = document.getElementsByClassName('pizzaimage');	
      for(let j of elements){	
        if (i.constructorImage == j.getAttribute('src')){	
          document.getElementById('pizza').removeChild(j);	
          break;	
        }	
      }	
    }	
  }	

  addToBasket(){	
    this.order.totalPrice = this.pizza.price;	
    this.basket.add(this.order);	
  }	
}