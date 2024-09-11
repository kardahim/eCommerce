import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { ICartItem } from '../../shared/interfaces/ICartItem';
import { IProduct } from '../../shared/interfaces/IProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  isCartOpen: boolean = false;
  cart!: ICartItem[];
  private isCartOpenStatusSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  closeDrawer() {
    this.cartService.toogleCart();
  }

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id, 1);
    this.cart = this.cartService.loadCart();
  }
  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id, 1);
    this.cart = this.cartService.loadCart();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.loadCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  ngOnInit() {
    this.isCartOpenStatusSubscription =
      this.cartService.isCartOpenStatus$.subscribe((status) => {
        // load cart and open drawer
        this.cart = this.cartService.loadCart();
        this.isCartOpen = status;
      });
  }

  ngOnDestroy() {
    if (this.isCartOpenStatusSubscription) {
      this.isCartOpenStatusSubscription.unsubscribe();
    }
  }
}
