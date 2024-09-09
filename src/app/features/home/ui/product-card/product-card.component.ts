import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price!: number;
  @Input() image_path!: string;
  @Input() short_description!: string;

  addToCart() {
    alert('not implemented!');
  }
  viewDetails() {
    alert('not implemented!');
  }
}
