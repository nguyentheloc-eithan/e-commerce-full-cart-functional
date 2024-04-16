import { tagNav } from '@/utils/list-tags';
import Link from 'next/link';
import React from 'react';

const ListTag = () => {
  return (
    <div className="flex items-center justify-around w-full">
      {tagNav.map((tag) => {
        return (
          <Link
            href={tag.link}
            key={tag.key}>
            <div className="hover:text-[#eb1c48] text-[16px] font-[500]">
              {tag.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListTag;
