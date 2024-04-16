/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { logo } from '@/utils/logo';

const HeaderLogin = () => {
  return (
    <div className="flex fixed flex-col w-full h-auto bg-[#fff] mb-[1rem] pb-0 lg:pt-4 lg:px-14 p-2">
      <div className="flex gap-[24px] items-center justify-start">
        <Link href={'/'}>
          <img
            src={logo}
            alt="Picture of the author"
            className="lg:w-[178px]  h-auto w-[125px] lg:cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeaderLogin;
