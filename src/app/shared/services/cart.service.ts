import { Injectable } from '@angular/core';
import { ICartItem } from '../interfaces/ICartItem';
import { IProduct } from '../interfaces/IProduct';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart';

  private isCartOpen: boolean = false;
  private isCartOpenSubject = new Subject<boolean>();
  public isCartOpenStatus$ = this.isCartOpenSubject.asObservable();

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
    this.isCartOpenSubject.next(this.isCartOpen);
  }

  getTotalPrice(): number {
    return this.loadCart().reduce(
      (total, item) => total + item.product.price * item.amount,
      0
    );
  }

  removeFromCart(id: number) {
    let cart = this.loadCart();
    cart = cart.filter((item) => item.product.id !== id);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  increaseQuantity(productId: number, amount: number): void {
    const cart = this.loadCart();
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem && existingItem.amount + amount < 21) {
      existingItem.amount += amount;
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  }

  decreaseQuantity(productId: number, amount: number): void {
    const cart = this.loadCart();
    const existingItem = cart.find((item) => item.product.id === productId);

    if (existingItem && existingItem.amount - amount > 0) {
      existingItem.amount -= amount;
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  }
}
