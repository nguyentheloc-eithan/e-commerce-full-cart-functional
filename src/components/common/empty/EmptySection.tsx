import { Empty } from 'antd';
import Link from 'next/link';
import React from 'react';

const EmptySection = () => {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 120, color: '#eb1c48' }}
        className=" h-[50vh] lg:h-[80vh] flex items-center justify-center flex-col"
        description={
          <span className="text-[12px] lg:text-[2rem]">
            Giỏ hàng bạn đang trống nè!
          </span>
        }>
        <Link href="/">
          <button className="bg-[#eb1c48] text-white hover:none font-[500] py-[0.5rem] px-2 rounded-[10px] hover:bg-[#f25678]">
            Mua sắm nào
          </button>
        </Link>
      </Empty>
    </div>
  );
};

export default EmptySection;
