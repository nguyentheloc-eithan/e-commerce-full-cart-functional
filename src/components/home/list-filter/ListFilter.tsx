import { filterOptionData } from '@/data/filter-option-data';
import React from 'react';
import ButtonIconFilter from './ButtonIconFilter';
import SliderRes from './SliderResponsive';

const ListFilter = () => {
  return (
    <>
      <div className="lg:hidden flex flex-col items-center justify-center py-[1rem] px-[0.5rem] h-fit">
        <SliderRes />
      </div>

      <div className="hidden lg:flex justify-between flex-wrap items-center gap-[8px] bg-[white] mt-[2rem] px-[12px] py-[12px] rounded-[8px] ">
        {filterOptionData.map((item) => {
          return (
            <ButtonIconFilter
              key={item.id}
              image={item.image}
              label={item.label}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListFilter;
