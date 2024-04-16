'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserLogin from '@/common/stores/user/user-login';
import { ICart } from '@/common/types/cart';
import { IProduct } from '@/common/types/product';
import EmptySection from '@/components/common/empty/EmptySection';
import ModalConfirm from '@/components/common/modals/ModalConfirm';
import { qtyData } from '@/data/count-data';
import { convertVnd } from '@/utils/format-money';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { Button, Select, message, Empty } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { userLogin, setUserLogin } = useUserLogin();

  const [cartUser, setCartUser] = useState<ICart>(userLogin.cart);
  const [products, setProducts] = useState<IProduct[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsPrice, setProductsPrice] = useState<number>(0);

  const [tax, setTax] = useState<number>(100000);
  const [shippingFee, setShippingFee] = useState<number>(50000);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [productDelete, setProductsDelete] = useState<IProduct>();

  useEffect(() => {
    if (userLogin.cart.qtyProduct == 0) {
      setProducts([]);
    } else {
      setProducts(userLogin.cart.products);
      let priceProduct: number = 0;
      userLogin.cart.products.map((item) => {
        const price = item.price * item.quantity;
        priceProduct = priceProduct + price;
      });
      setProductsPrice(priceProduct);
      const finalPrice = priceProduct + tax + shippingFee;
      setTotalPrice(finalPrice);
    }
  }, [userLogin]);
  const onHandleChangeQuantity = (value: string, product: IProduct) => {
    const newUser = userLogin;
    const position = newUser.cart.products.findIndex(
      (item) => item.id == product.id
    );

    const updateQuantityProductsCart =
      newUser.cart.qtyProduct - newUser.cart.products[position].quantity;
    const updateQty = Number(value);
    const productAdd = { ...product, quantity: updateQty };
    newUser.cart.products[position] = productAdd;
    newUser.cart.qtyProduct = updateQuantityProductsCart + updateQty;
    setUserLogin({ ...newUser });
    message.info(`Thay đổi số lượng ${product.name} thành công`);
  };

  const deleteProduct = (product: IProduct) => {
    product = productDelete as IProduct;
    const newUser = userLogin;
    const position = newUser.cart.products.findIndex(
      (item) => item.id == product.id
    );
    const deleteQty = newUser.cart.products[position].quantity;
    const filterDeleteProduct = newUser.cart.products.filter(
      (item) => item.id !== product.id
    );
    newUser.cart.products = filterDeleteProduct;
    newUser.cart.qtyProduct = newUser.cart.qtyProduct - deleteQty;
    setUserLogin({ ...newUser });
    message.success(`Xóa ${product.name} thành công`);
    setOpenConfirmDelete(false);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div className="bg-white w-full">
      {userLogin.cart.qtyProduct == 0 ? (
        <EmptySection />
      ) : (
        <>
          {openConfirmDelete && (
            <ModalConfirm
              onOk={deleteProduct}
              onCancel={() => setOpenConfirmDelete(false)}
              open={openConfirmDelete}
            />
          )}
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="lg:col-span-7">
                <h2
                  id="cart-heading"
                  className="sr-only">
                  Items in your shopping cart
                </h2>

                <ul
                  role="list"
                  className="divide-y divide-gray-200 border-b border-t border-gray-200">
                  {products.map((product, productIdx) => (
                    <li
                      key={product.id}
                      className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={''}
                          // width={96}
                          // height={96}
                          className="h-24 w-24 rounded-md object-contain object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <div className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.name}
                                </div>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">
                                {'product variants'}
                              </p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {convertVnd(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <Select
                              placeholder="Só lượng"
                              optionFilterProp="children"
                              onChange={(value) =>
                                onHandleChangeQuantity(value, product)
                              }
                              defaultValue={product.quantity.toString()}
                              filterOption={filterOption}
                              options={qtyData.map((item) => {
                                return {
                                  label: item.toString(),
                                  value: item.toString(),
                                };
                              })}
                            />

                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setProductsDelete(product);
                                  setOpenConfirmDelete(true);
                                }}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <XMarkIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          {product.inStock ? (
                            <CheckIcon
                              className="h-5 w-5 flex-shrink-0 text-green-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <ClockIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-300"
                              aria-hidden="true"
                            />
                          )}

                          <span>
                            {product.inStock ? 'In stock' : `Ships in 3 weeks`}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900">
                  Thông tin đơn hàng
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Sản phẩm</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {convertVnd(productsPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Phí vận chuyển</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {convertVnd(shippingFee)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Thuế VAT</span>
                      <a
                        href="#"
                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                        <QuestionMarkCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {convertVnd(tax)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Tổng tiền đơn hàng
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {convertVnd(totalPrice)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Link href={'/checkout'}>
                    <Button
                      htmlType="button"
                      type="primary"
                      className="bg-[#eb1c48] text-white w-full font-medium">
                      Tiến hành thanh toán
                    </Button>
                  </Link>
                </div>
              </section>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
