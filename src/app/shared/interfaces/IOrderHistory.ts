import { ICartItem } from './ICartItem';

export interface IOrderHistory {
  cart: ICartItem[];
  orderDate: Date;
}
