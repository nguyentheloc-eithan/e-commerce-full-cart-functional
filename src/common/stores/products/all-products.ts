import { create } from 'zustand';
import { IProduct } from '../../types/product';

type State = {
  allProducts: IProduct[];
  selectedProduct: IProduct;
};

type Action = {
  setAllProducts: (product: State['allProducts']) => void;
  setSelectedProduct: (product: State['selectedProduct']) => void;
};
const useProductStore = create<State & Action>((set) => ({
  allProducts: [],
  selectedProduct: {
    id: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    quantity: 0,
    category: null,
  },
  setAllProducts: (product) => set(() => ({ allProducts: product })),
  setSelectedProduct: (product) => set(() => ({ selectedProduct: product })),
}));

function useFetchProduct() {
  let allProducts = useProductStore((state) => state.allProducts);
  let setAllProducts = useProductStore((state) => state.setAllProducts);

  let selectedProduct = useProductStore((state) => state.selectedProduct);
  let setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  return { allProducts, setAllProducts, selectedProduct, setSelectedProduct };
}
export default useFetchProduct;
