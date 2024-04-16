import { IProduct } from './product';

interface ICart {
  products: IProduct[];
  qtyProduct: number;
}

export type { ICart };
