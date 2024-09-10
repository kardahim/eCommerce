import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  productsAmount: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(+productId).subscribe((product) => {
        if (product) {
          this.product = product;
        } else this.router.navigate(['/']);
      });
    } else this.router.navigate(['/']);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.productsAmount);
  }

  increaseAmount() {
    if (this.productsAmount < 20) this.productsAmount++;
  }
  decreaseAmount() {
    if (this.productsAmount > 1) this.productsAmount--;
  }
}
