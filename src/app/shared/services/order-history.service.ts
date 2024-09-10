import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { IOrderHistory } from '../interfaces/IOrderHistory';
import { AuthService } from './auth.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  constructor(private authService: AuthService) {}

  addOrder(cart: ICartItem[], orderDate: Date): void {
    const user: IUser | null = this.authService.getLoggedInUser();

    if (user) {
      user.history = user.history || [];
      user.history.push({ cart, orderDate });

      this.authService.updateUser(user);
    }
  }
}
