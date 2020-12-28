import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';


class Pizza{
  name: string;
  info: string;
  price: Object;
  image: string;
  defaultSize: string = '22 cm';
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pizza: Pizza[] = [];
  showPizza: Pizza;

  constructor(private http: HttpClient) { }

  getPizza(): Observable<Pizza[]> {
    return this.http.get('https://pizzeria-ec9c3-default-rtdb.europe-west1.firebasedatabase.app/.json').pipe(map(data =>{
      let pizzaList = data['Pizza'];
      return pizzaList.map((pizza: any) => {
        return {name: pizza.name, info: pizza.info, price: pizza.price, image: pizza.image, defaultSize: '22 cm'}
      })
    }))
  }

  ngOnInit(){
    this.getPizza().subscribe((data) => this.pizza = data)
  }

  setSize(p: Pizza, size: string){
    for(let i of this.pizza){
      if(i == p){
        i.defaultSize = size;
      }
    }
  }

  showIngredients(p: Pizza){
    document.getElementById('ingr').style.display = 'block';
    this.showPizza = p;
  }
}
