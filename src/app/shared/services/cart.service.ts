import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { IProduct } from '../interfaces/IProduct';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart';
  public isCartOpen: boolean = false;
  public cartChanged: EventEmitter<ICartItem[]> = new EventEmitter<
    ICartItem[]
  >();

  constructor() {}

  loadCart(): ICartItem[] {
    const cart = localStorage.getItem(this.CART_KEY);
    const parsedCart = cart ? JSON.parse(cart) : [];
    this.cartChanged.emit(parsedCart);
    return parsedCart;
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
    this.cartChanged.emit(cart);
  }

  toogleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}
