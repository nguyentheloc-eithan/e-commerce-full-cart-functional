'use client';
import React, { useRef, useState } from 'react';
import ButtonIconFilter from './ButtonIconFilter';
import { filterOptionData } from '@/data/filter-option-data';

const SliderRes = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current!.offsetLeft);
    setScrollLeft(sliderRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the sliding speed here
    sliderRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="flex flex-row w-full items-end gap-[20px] lg:px-[28px]  lg:gap-[60px] overflow-x-scroll hide-scrollbar "
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      {filterOptionData.map((item) => (
        <ButtonIconFilter
          key={item.id}
          image={item.image}
          label={item.label}
        />
      ))}
    </div>
  );
};

export default SliderRes;
