import React, { useState } from 'react';
import { ICategory } from '@/common/types/category';
import { IProduct } from '@/common/types/product';
import { CategoriesListProps } from '@/common/types/props/categories-list';
import { commerceProducts } from '@/data/products';
import { Button } from 'antd';

const ListCategories = ({
  categories,
  setAllProducts,
}: CategoriesListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<any>();
  const handleFilterProductByCategory = (item: ICategory) => {
    try {
      if (selectedIndex !== item.id) {
        setSelectedIndex(item.id);
        const productFilter: IProduct[] = commerceProducts.filter(
          (product) => product.category == item.label
        );
        setAllProducts([...productFilter]);
      } else {
        setSelectedIndex(null);
        setAllProducts(commerceProducts);
      }
    } finally {
    }
  };
  return (
    <div className="hidden lg:flex lg:my-[2rem]  flex-wrap items-center justify-center gap-[1.5rem]">
      {categories.map((item: ICategory, index: number) => {
        return (
          <Button
            type="primary"
            onClick={() => handleFilterProductByCategory(item)}
            className={`${
              selectedIndex == item.id
                ? 'bg-[#eb1c48] text-[white] font-[500] '
                : 'bg-[#fff] text-[black] font-[500]'
            } flex items-center justify-center`}
            key={index}>
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default ListCategories;
