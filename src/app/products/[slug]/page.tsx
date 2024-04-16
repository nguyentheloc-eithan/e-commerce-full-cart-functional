/* eslint-disable @next/next/no-img-element */
'use client';
import useFetchProduct from '@/common/stores/products/all-products';
import useUserLogin from '@/common/stores/user/user-login';
import { IProduct } from '@/common/types/product';
import { IUser } from '@/common/types/user';
import { productDetailData } from '@/data/product-detail-data';
import { commerceProducts } from '@/data/products';
import { convertVnd } from '@/utils/format-money';
import { Button, message } from 'antd';
import { useEffect, useState } from 'react';

interface ProductDetail {
  params: { slug: string };
}

const ProductDetail = ({ params }: ProductDetail) => {
  const { selectedProduct } = useFetchProduct();
  const { userLogin, setUserLogin } = useUserLogin();

  const [product, setProduct] = useState<IProduct>(selectedProduct);

  const handelAddToCart = () => {
    const newUser = userLogin;

    const checkExist = userLogin.cart.products.filter(
      (item) => item.id == product.id
    );

    if (checkExist.length > 0) {
      const position = newUser.cart.products.findIndex(
        (item) => item.id == product.id
      );
      const updateQty = newUser.cart.products[position].quantity + 1;
      const productAdd = { ...product, quantity: updateQty };
      newUser.cart.products[position] = productAdd;
      newUser.cart.qtyProduct++;
      setUserLogin({ ...newUser });
      message.success('Thêm sản phẩm vào giỏ hàng thành công');
      return;
    }

    const productAdd = { ...product, quantity: 1 };
    newUser.cart.products.push(productAdd);
    newUser.cart.qtyProduct++;

    setUserLogin({ ...newUser });
    message.success('Thêm sản phẩm vào giỏ hàng thành công');
  };

  useEffect(() => {
    const productFind = commerceProducts.filter(
      (item) => item.id == params.slug
    );

    if (productFind.length <= 0) {
      message.error('Sản phẩm không tìm thấy');
      return;
    }
    localStorage.setItem('cart', JSON.stringify(userLogin.cart));
    setProduct(productFind[0]);
  }, [params.slug, userLogin.cart]);
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product?.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product?.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product?.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product?.image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {convertVnd(product?.price)}
            </p>

            <Button
              className=" my-[4rem] w-full h-[3rem] text-[20px] font-[700] bg-[#eb1c48] hover:bg-transparent text-[white]"
              onClick={handelAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul
                  role="list"
                  className="list-disc space-y-2 pl-4 text-sm">
                  {productDetailData.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  {/* {selectedProduct.description} */}
                  Introducing our innovative product, designed to elevate your
                  daily life. With a focus on quality and functionality, our
                  offering brings a new level of convenience and enjoyment to
                  your routine. Crafted with precision and style, this product
                  is a testament to modern design and engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
