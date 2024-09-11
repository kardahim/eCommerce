import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  cart_items_number!: number;
  isLogged: boolean = false;

  private cartSubscription!: Subscription;
  private isLoggedStatusSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // first load
    this.cart_items_number = this.cartService.loadCart().length;

    // update badge
    this.cartSubscription = this.cartService.cartChanged.subscribe((cart) => {
      this.cart_items_number = cart.length;
    });

    // Initialize login status from AuthService and subscribe to future changes
    this.isLogged = this.authService.isLoggedIn(); // Get current status
    this.isLoggedStatusSubscription =
      this.authService.isLoggedStatus$.subscribe((status) => {
        this.isLogged = status;
      });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    if (this.isLoggedStatusSubscription) {
      this.isLoggedStatusSubscription.unsubscribe();
    }
  }

  toogleCart() {
    this.cartService.toogleCart();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
