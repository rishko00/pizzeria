import { Component } from '@angular/core';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  countOfItems: number = this.basket.getLength();
  constructor(private basket: BasketService){}
}
