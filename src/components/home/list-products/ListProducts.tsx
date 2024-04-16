/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CardProducts } from '@/common/types/props/card-product/CardProducts';
import { IProduct } from '@/common/types/product';
import useUserLogin from '@/common/stores/user/user-login';
import { checkLogin } from '@/services/check-login';
import { Button, Card, Modal, Select } from 'antd';
import useFetchProduct from '@/common/stores/products/all-products';
import { convertVnd } from '@/utils/format-money';
import { FilterOutlined } from '@ant-design/icons';
import { ListCategoriesData } from '@/data/catefories-data';
import { ICategory } from '@/common/types/category';
import { commerceProducts } from '@/data/products';

const { Meta } = Card;

const ListProducts = ({ products, setAllProducts }: CardProducts) => {
  const { userLogin } = useUserLogin();

  const { setSelectedProduct } = useFetchProduct();
  const router = useRouter();

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [activeButtonFilter, SetActiveButtonFilter] = useState<boolean>(false);

  const [productFilter, setProductFilter] =
    useState<IProduct[]>(commerceProducts);

  const handleFilterProductByCategory = (item: ICategory) => {
    try {
      const productGet: IProduct[] = productFilter.filter(
        (product) => product.category == item
      );
      console.log('productGet:', productGet);

      setAllProducts(productGet);
    } finally {
      setOpenFilter(false);
    }
  };
  const handleCancel = () => {
    setAllProducts(commerceProducts);
    setOpenFilter(false);
    SetActiveButtonFilter(false);
  };

  const onHandleClickProduct = (product: IProduct) => {
    setSelectedProduct(product);
    router.push(`/products/${product.id}`);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div className="bg-white rounded-[8px]">
      {openFilter && (
        <Modal
          title="Bộ lọc"
          open={true}
          centered
          // onOk={}
          onCancel={handleCancel}
          footer={[
            <Button
              key="back"
              onClick={handleCancel}>
              Hủy lọc
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => handleFilterProductByCategory(selectedCategory)}
              className="text-white bg-[#eb1c48]">
              Áp dụng
            </Button>,
          ]}>
          <div className="flex flex-col">
            <label className="font-bold my-[4px]">Danh mục</label>
            <Select
              showSearch
              allowClear
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              defaultValue={
                selectedCategory ? selectedCategory : 'Chọn danh mục'
              }
              // onChange={onChange}
              // onSearch={onSearch}
              onSelect={(value) => setSelectedCategory(value)}
              filterOption={filterOption}
              options={ListCategoriesData.map((item) => {
                return {
                  label: item.name,
                  value: item.label,
                };
              })}
            />
          </div>
        </Modal>
      )}

      <div className="mx-auto max-w-2xl pt-2 px-4 sm:px-6 sm:py-[4rem] lg:max-w-7xl lg:px-8">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#eb1c48]">
            Các sản phẩm nổi bật
          </h2>
          <Button
            type="default"
            className={`${
              activeButtonFilter ? 'bg-[#eb1c48] text-white font-bold' : ''
            } lg:hidden w-[12px] h-[32px] flex items-center justify-center`}
            onClick={() => {
              setOpenFilter(true);
              SetActiveButtonFilter(true);
            }}>
            <FilterOutlined />
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product: IProduct) => {
            return (
              <Card
                onClick={() => {
                  onHandleClickProduct(product);
                }}
                key={product.id}
                hoverable
                className="lg:w-[19rem]"
                cover={
                  <img
                    className="h-[15rem] w-full object-cover rounded-[0.5rem] border-b-[0.5px]"
                    alt="example"
                    src={product.image}
                  />
                }>
                <div className="lg:text-[18px] font-[400]">{product.name}</div>
                <div className="lg:text-[16px] font-[700]">
                  {convertVnd(product.price)}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
