import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { StorepageComponent } from './storepage/storepage.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent }, // Default route
  { path: 'storepage', component: StorepageComponent },
  {path: 'cart', component: CartComponent},
  // Add more routes for your components here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
