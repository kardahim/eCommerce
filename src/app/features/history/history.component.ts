import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IOrderHistory } from '../../shared/interfaces/IOrderHistory';
import { OrderHistoryService } from '../../shared/services/order-history.service';
import { ICartItem } from '../../shared/interfaces/ICartItem';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  orderHistory: IOrderHistory[] = [];

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit() {
    this.orderHistory = this.orderHistoryService.loadOrder().reverse();
  }

  calculateSingleOrder(cart: ICartItem[]): number {
    return cart.reduce(
      (total, item) => total + item.product.price * item.amount,
      0
    );
  }
}
