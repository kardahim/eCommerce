import { IOrderHistory } from './IOrderHistory';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeatPassword?: string;
  history?: IOrderHistory[];
}
