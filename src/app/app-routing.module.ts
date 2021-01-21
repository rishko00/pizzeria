import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ConstructorComponent } from './pages/cons/constructor.component';
import { AuthComponent } from './pages/auth-admin/auth-admin.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './app-core/guards/admin.guard';
import { SnackComponent } from './pages/snacks/snacks.component'; 
import { PotatoComponent } from './pages/potato/potato.component';
import { SauceComponent } from './pages/sauces/sauce.component';
import { DrinksComponent } from './pages/drinks/drinks.component';

const routes: Routes = [
    { path: '', component: PizzaComponent},
    { path: 'pizza', component: PizzaComponent},
    { path: 'basket', component: BasketComponent},
    { path: 'constructor', component: ConstructorComponent},
    { path: 'auth', component: AuthComponent },
    { path: 'list', component: AdminComponent, canActivate: [AdminGuard]},
    { path: 'snacks', component: SnackComponent },
    { path: 'potato', component: PotatoComponent },
    { path: 'sauces', component: SauceComponent },
    { path: 'drinks', component: DrinksComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AppRoutingModule { }
