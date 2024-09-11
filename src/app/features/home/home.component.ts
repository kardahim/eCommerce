import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from './ui/product-card/product-card.component';
import { IProduct } from '../../shared/interfaces/IProduct';
import { NgFor } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';
import { FiltersComponent } from './ui/filters/filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products!: IProduct[];
  filteredProducts!: IProduct[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredProducts = [...this.products];
    });
  }

  // filtering is based on include
  filterBySeach(search: string) {
    if (search.trim() === '') {
      this.productService.getProducts().subscribe((data) => {
        this.products = data.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredProducts = [...this.products];
      });
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().trim().includes(search.toLowerCase().trim())
      );
    }
  }

  sortBy(sort: string) {
    switch (sort) {
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log('Invalid sort option');
        break;
    }
  }
}
