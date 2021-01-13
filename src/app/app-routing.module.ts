import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pizza.component';
import { BasketComponent } from './basket.component';
import { ConstructorComponent } from './constructor.component';
import { AuthComponent } from './auth-admin.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    { path: '', component: PizzaComponent},
    { path: 'pizza', component: PizzaComponent},
    { path: 'basket', component: BasketComponent},
    { path: 'constructor', component: ConstructorComponent},
    { path: 'auth', component: AuthComponent },
    { path: 'list', component: AdminComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
