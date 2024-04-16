/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
} from 'antd';
import { BellIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import CategoryButton from './header/CategoryButton';
import { logo } from '@/utils/logo';
import ListTag from './header/ListTag';
import useUserLogin from '@/common/stores/user/user-login';
import { useRouter } from 'next/navigation';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link
        // target="_blank"
        // rel="noopener noreferrer"
        href="">
        Thông tin cá nhân
      </Link>
    ),
  },

  {
    key: '2',
    label: (
      <Link
        // rel="noopener noreferrer"
        href="">
        <div className="text-[red]">Đăng xuất</div>
      </Link>
    ),
  },
];

interface HeadNavProps {
  onHandleToggleMenu: any;
  openMenu: boolean;
}

const HeaderNav = ({ onHandleToggleMenu, openMenu }: HeadNavProps) => {
  const { userLogin } = useUserLogin();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-auto bg-[#fff] mb-[1rem] pb-0 lg:pt-4 lg:px-14 p-2 border-2 lg:border-b-[#eb1c48]">
      <div className="flex gap-[24px] items-center justify-between lg:justify-around">
        <div className="flex ">
          <Button
            className="lg:hidden  w-[12px] border-none flex items-center justify-center"
            onClick={onHandleToggleMenu}>
            {openMenu ? (
              <MenuFoldOutlined className="text-[1.5rem]" />
            ) : (
              <MenuUnfoldOutlined />
            )}
          </Button>

          <Link href={'/'}>
            <img
              src={logo}
              alt="Picture of the author"
              className="lg:w-[178px]  h-auto w-[125px] lg:cursor-pointer"
            />
          </Link>
        </div>

        <Input
          className="hidden lg:block lg:w-[800px] lg:h-[40px]"
          placeholder="Tìm kiếm"
          size="large"
          // allowClear
        />
        <div className="flex lg:gap-[18px] items-center justify-center">
          <BellIcon className="lg:h-[26px] lg:w-[26px] text-[#542c2c] cursor-pointer" />
          <Link href={'/cart'}>
            <Badge
              size="small"
              count={userLogin.cart.qtyProduct}
              className="lg:mr-0 mr-[8px] ">
              <ShoppingCartIcon className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] text-[#542c2c]  cursor-pointer" />
            </Badge>
          </Link>

          {userLogin.name !== '' ? (
            <>{userLogin.name}</>
          ) : (
            // <Dropdown
            //   menu={{ items }}
            //   placement="bottomRight"
            //   arrow={{ pointAtCenter: true }}>
            //   <Avatar className="cursor-pointer">U</Avatar>
            // </Dropdown>
            // <Button
            //   className="lg:text-[14px] font-[600] bg-[#eb1c48] hover:bg-transparent text-[white]"
            //   onClick={() => {
            //     router.push('/login');
            //   }}>
            //   <p>Sign in</p>
            // </Button>
            <></>
          )}
        </div>
      </div>
      <div className="hidden lg:flex w-auto mt-[24px]">
        <CategoryButton />
        <ListTag />
      </div>
    </div>
  );
};

export default HeaderNav;
