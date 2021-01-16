import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'auth',
  template: `
  <div class="form-group">
        <label>Email:</label>
        <input class="form-control" type="text" name="email" [(ngModel)]="email"/>
      </div>

      <div class="form-group">
        <label for="Autocomplete">Password</label>
        <input type="text" class="form-control" name="email" [(ngModel)]="email"/>
      </div>
      <button class="orderbtn" (click)="login()">Оформити замовлення</button>
      <div class="alert alert-danger" role="alert" *ngIf="login()">
  A simple danger alert—check it out!
</div>
  `
})

export class AuthComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService){};

  ngOnInit(){};

  login(){
    this.auth.login(this.email, this.password);
    if(localStorage.getItem('user')) return true;
    else return false;
  }
}