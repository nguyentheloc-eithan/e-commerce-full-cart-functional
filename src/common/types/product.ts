import { ICategory } from './category';

interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  inStock?: boolean;
  category: any;
}
export type { IProduct };
