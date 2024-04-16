/* eslint-disable @next/next/no-img-element */
'use client';
import { imgHeroSlider } from '@/utils/slider-img';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SliderImageHeroProps } from '@/common/types/props/slider-image-hero';

const SliderImageHero = ({ images }: SliderImageHeroProps) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}>
      {images?.map((image: any) => {
        return (
          <SwiperSlide key={image.key}>
            <img
              className="w-full h-[27rem] object-cover rounded-[8px]"
              src={image.image}
              alt=""
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SliderImageHero;
