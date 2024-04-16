'use client';
import { IProduct } from '@/common/types/product';
import SliderImageHero from '@/components/home/SliderImageHero';
import Collections from '@/components/home/collections/Collections';
import ListCategories from '@/components/home/list-categories/ListCategories';
import ListFilter from '@/components/home/list-filter/ListFilter';
import ListProducts from '@/components/home/list-products/ListProducts';
import ProductFeature from '@/components/home/product-feature/ProductFeatures';
import ShopByCategories from '@/components/home/shop-by-categories/ShopByCategories';
import { ListCategoriesData } from '@/data/catefories-data';
import { commerceProducts } from '@/data/products';
import { imgHeroSlider } from '@/utils/slider-img';
import { useState } from 'react';

const HomePage = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>(commerceProducts);

  return (
    <div className="pb-[2rem] w-full  lg:px-[7rem]">
      <SliderImageHero images={imgHeroSlider} />
      <ListFilter />
      <ListCategories
        categories={ListCategoriesData}
        setAllProducts={setAllProducts}
      />

      <ListProducts
        products={[...allProducts]}
        setAllProducts={setAllProducts}
      />
      <ShopByCategories />
      <Collections />
      <ProductFeature />
    </div>
  );
};

export default HomePage;
