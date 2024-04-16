/* eslint-disable @next/next/no-img-element */
'use client';
import FormLogin from '@/components/login/FormLogin';
import HeaderLogin from '@/components/login/HeaderLogin';
import Image from 'next/image';
import React, { useState } from 'react';

const img =
  'https://ucarecdn.com/502497c7-cc5f-429c-b421-f0a3bce89f32/-/format/auto/-/quality/smart_retina/';
const LoginPage = () => {
  const [activeLogin, setActiveLogin] = useState(true);
  const [activeRegister, setActiveRegister] = useState(false);

  return (
    <div>
      <HeaderLogin />
      <div className="flex items-center justify-center h-[100vh] w-full pt-[3rem]">
        {' '}
        <div className="lg:grid grid-cols-2">
          <div className="w-full h-full flex flex-col items-center justify-center font-[500]">
            <div className="lg:text-[32px]">Thỏa sức mua sắm cùng </div>
            <div className="text-[36px]">
              <span className="font-[700] text-[#eb1c48]">TVL</span>Mart
            </div>
            <Image
              className="lg:h-[510px] lg:w-[510px] object-contain"
              width={510}
              height={510}
              src={img}
              alt={'hero'}
            />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            {activeLogin && <FormLogin setActiveRegister={setActiveRegister} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
