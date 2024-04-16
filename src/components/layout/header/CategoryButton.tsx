'use client';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { Divider, Dropdown, MenuProps } from 'antd';
import Icon from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    label: 'Thịt',
    key: 'meat',
  },
  {
    label: 'Rau củ',
    key: 'vegetable',
  },
  {
    label: 'Đồ công nghệ',
    key: 'technology',
  },
  {
    label: 'Thời Trang',
    key: 'cloth',
  },
];

const CategoryButton = () => {
  return (
    <Dropdown
      menu={{ items }}
      dropdownRender={(menu) => (
        <div className="lg:w-[40rem] lg:h-[30rem]">{menu}</div>
      )}>
      <button className="flex bg-[#eb1c48] hover:bg-[#df2445] w-auto px-4 lg:h-[2rem] text-[#fff] items-center justify-center rounded-t-[8px] cursor-pointer">
        <Bars3Icon className="lg:h-[26px] lg:w-[26px] font-[700]" />
        <div className="w-[5.4rem]  text-[16px] font-[700] ">Danh mục</div>
      </button>
    </Dropdown>
  );
};

export default CategoryButton;
