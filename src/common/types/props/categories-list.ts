import { ICategory } from '../category';
import { IProduct } from '../product';

export interface CategoriesListProps {
  categories: ICategory[];
  setAllProducts: (category: IProduct[]) => void;
}
