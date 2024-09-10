import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() image_path!: string;
  @Input() short_description!: string;
  @Input() id!: number;

  constructor(private router: Router) {}

  addToCart() {
    alert('not implemented!');
  }
  viewDetails() {
    this.router.navigate(['/product', this.id]);
  }
}
