import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  template: `
  <div class="container pt-3">
  <div class="row justify-content-sm-center">
    <div class="col-sm-10 col-md-6">
      <div class="card border-info">
        <div class="card-header">Login</div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 text-center">
              <img src="https://placeimg.com/128/128/nature">
            </div>
            <div class="col-md-8">
              <form>
                <input type="text" class="form-control mb-2" placeholder="Email" [(ngModel)]="email" name="email" required autofocus>
                <input type="password" class="form-control mb-2" placeholder="Password" [(ngModel)]="password" name="password" required>
                <button class="btn btn-lg btn-primary btn-block mb-1" type="submit" (click)="login()">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  styles: ['./app.component.css']
})

export class AuthComponent {
  email: string;
  password: string;

  constructor(private auth: AuthService){};

  ngOnInit(){};

  login(){
    this.auth.login(this.email, this.password)
  }
}