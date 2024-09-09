import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './ui/product-card/product-card.component';
import { IProduct } from '../../shared/interfaces/IProduct';
import { NgFor } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // fetch from local storage
  products!: IProduct[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
