import { ICart } from '@/common/types/cart';
import { IUser } from '@/common/types/user';
import { create } from 'zustand';
export const initCart: ICart = {
  qtyProduct: 0,
  products: [],
};
export const initUser: IUser = {
  id: '',
  name: '',
  avatar: '',
  email: '',
  phone: '',
  cart: initCart,
};

type State = {
  userLogin: IUser;
};

type Action = {
  setUserLogin: (user: State['userLogin']) => void;
};

const useUserStore = create<State & Action>((set) => ({
  userLogin: initUser,
  setUserLogin: (user) => set(() => ({ userLogin: user })),
}));

function useUserLogin() {
  let userLogin = useUserStore((state) => state.userLogin);
  let setUserLogin = useUserStore((state) => state.setUserLogin);
  return { userLogin, setUserLogin };
}

export default useUserLogin;
