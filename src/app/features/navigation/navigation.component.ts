import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  cart_items_number!: number;
  private cartSubscription!: Subscription;
  private cartIsOpenSubscription!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // first load
    this.cart_items_number = this.cartService.loadCart().length;

    // update badge
    this.cartSubscription = this.cartService.cartChanged.subscribe((cart) => {
      this.cart_items_number = cart.length;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toogleCart() {
    this.cartService.toogleCart();
  }
}
