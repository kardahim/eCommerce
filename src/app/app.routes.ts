import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { HistoryComponent } from './features/history/history.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { cartGuard } from './guards/cart.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [cartGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [authGuard],
  },
];
