import { Component } from '@angular/core';
import { BasketService } from './app-core/services/basket.service';
import { AuthService } from './app-core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  countOfItems: number = this.basket.getLength();
  authLink: string = this.auth.isLoggedIn ? 'list' : 'auth';

  constructor(private basket: BasketService, private auth: AuthService){}
}
