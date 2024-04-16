import { IUser } from '@/common/types/user';

export const checkLogin = (user: IUser) => {
  console.log(user);
  if (user.id == '') {
    return false;
  } else {
    return true;
  }
};
