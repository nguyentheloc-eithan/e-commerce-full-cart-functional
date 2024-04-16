/* eslint-disable @next/next/no-img-element */
import { ButtonIconFilterProps } from '@/common/types/props/button-icon-flter';
import React from 'react';

const ButtonIconFilter = ({ image, label }: ButtonIconFilterProps) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer bg-[white]  h-[5rem] rounded-[8px] lg:bg-none p-[4px]">
      <img
        src={image}
        alt=""
        className="w-[56px] h-[56px]"
      />
      <div className="text-[#141416] w-[5rem] hover:text-[#eb1c48] font-[500] text-center lg:text-[14px] text-[10px]">
        {label}
      </div>
    </div>
  );
};

export default ButtonIconFilter;
