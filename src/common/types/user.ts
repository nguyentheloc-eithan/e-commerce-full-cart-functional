import { ICart } from './cart';
import { IProduct } from './product';

interface IUser {
  id: string;
  name: string;
  avatar?: string;
  phone: any;
  email?: string;

  cart: ICart;
}

export type { IUser };
