import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart';

  constructor() {}

  loadCart(): ICartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: IProduct, amount: number) {
    const cart = this.loadCart();

    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.amount += amount;
    } else {
      cart.push({ product, amount });
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
}
