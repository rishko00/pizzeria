import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaComponent } from './pizza.component';
import { BasketComponent } from './basket.component';
import { ConstructorComponent } from './constructor.component';
import { AuthComponent } from './auth-admin.component';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { SnackComponent } from './snacks.component'; 
import { PotatoComponent } from './potato.component';
import { SauceComponent } from './sauce.component';

const routes: Routes = [
    { path: '', component: PizzaComponent},
    { path: 'pizza', component: PizzaComponent},
    { path: 'basket', component: BasketComponent},
    { path: 'constructor', component: ConstructorComponent},
    { path: 'auth', component: AuthComponent },
    { path: 'list', component: AdminComponent, canActivate: [AdminGuard]},
    { path: 'snacks', component: SnackComponent },
    { path: 'potato', component: PotatoComponent },
    { path: 'sauces', component: SauceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AppRoutingModule { }
