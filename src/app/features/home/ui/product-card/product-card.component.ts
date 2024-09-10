import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../../shared/interfaces/IProduct';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  constructor(private router: Router, private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product, 1);
  }

  viewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
