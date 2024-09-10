import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgIf } from '@angular/common';

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
    private router: Router
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
    alert('not implemented');
  }

  increaseAmount() {
    this.productsAmount++;
  }
  decreaseAmount() {
    if (this.productsAmount > 1) this.productsAmount--;
  }
}
