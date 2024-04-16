/* eslint-disable @next/next/no-img-element */
'use client';
import useUserLogin from '@/common/stores/user/user-login';
import { ILocation, IProvince } from '@/common/types/location';
import { IProduct } from '@/common/types/product';
import EmptySection from '@/components/common/empty/EmptySection';
import InputForm from '@/components/common/input/InputForm';
import InputPhone from '@/components/common/input/InputPhone';
import ModalConfirm from '@/components/common/modals/ModalConfirm';
import SelectForm from '@/components/common/select/SelectForm';
import { qtyData } from '@/data/count-data';
import { supabase } from '@/services/api/supabase/supabase-client';
import { convertVnd } from '@/utils/format-money';
import { PhoneOutlined } from '@ant-design/icons';
import { RadioGroup } from '@headlessui/react';
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
];
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CheckoutPage() {
  const router = useRouter();
  const { userLogin, setUserLogin } = useUserLogin();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [provinces, setProvinces] = useState<IProvince[]>([] as IProvince[]);
  const [filterLocation, setFilterLocation] = useState<ILocation>(
    {} as ILocation
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const [tax, setTax] = useState<number>(100000);
  const [shippingFee, setShippingFee] = useState<number>(50000);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productsPrice, setProductsPrice] = useState<number>(0);

  const [productDelete, setProductsDelete] = useState<IProduct>();

  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
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

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data } = await supabase.from('provinces').select('*');
        if (data) {
          setProvinces(
            data?.map((_) => ({
              code: _?.province_code,
              districts: JSON.parse(_?.districts),
              id: _?.id,
              name: _?.province_name,
            })) ?? []
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProvinces();
  }, []);
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
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  //loading button
  const handleOkButtonPayment = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      router.push('/confirm');
    }, 1200);
  };
  return (
    <div className="bg-gray-50 ">
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
          <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl lg:max-w-none">
              <Form
                layout="vertical"
                className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Thông tin liên lạc
                    </h2>
                    <div className="mt-4">
                      <InputForm
                        label="Email"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-2">
                    <h2 className="text-lg font-medium text-gray-900">
                      Thông tin nhận hàng
                    </h2>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <InputForm
                          required
                          placeholder="Nhập tên người nhận"
                          label="Tên người nhận"
                          name="receiver"
                        />
                      </div>

                      <div>
                        <InputPhone
                          size="middle"
                          name="customer_phone"
                          label="Số điện thoại"
                          placeholder="Số điện thoại người nhận"
                          // onChange={(value: any) => {
                          //   setPhone(value.tartget.value);
                          // }}
                          required={true}
                          suffixIcon={
                            <PhoneOutlined
                              width={24}
                              height={24}
                              color="black"
                            />
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <InputForm
                          placeholder="Nhập tay nếu muốn"
                          label="Địa chỉ"
                          name="address"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <InputForm
                          placeholder="Ví dụ: Số 2, đường Ngô Tất Tố, Block C, Chung cư VinHome"
                          required
                          label="Chung cư, block, etc.."
                          name="details_address"
                        />
                      </div>

                      <div>
                        <SelectForm
                          allowClear
                          required
                          size={'middle'}
                          name={'city'}
                          options={provinces.map((_) => ({
                            label: _.name,
                            value: _.name,
                          }))}
                          onSelect={(itemSelect) => {
                            const location = provinces.filter(
                              (province) => province.name == itemSelect
                            )[0];

                            setFilterLocation(() => {
                              return {
                                districts: location.districts,
                                wards: [],
                              };
                            });
                          }}
                          label="Tỉnh / Thành phố"
                          placeholder="Chọn tỉnh thành"
                        />
                      </div>

                      <div>
                        <SelectForm
                          allowClear
                          required
                          size="middle"
                          name={'district'}
                          onSelect={(_) => {
                            const wards = filterLocation.districts?.filter(
                              (district) => district.district_name === _
                            )[0]?.wards;
                            console.log(
                              'filterLocation.districts',
                              filterLocation.districts
                            );
                            setFilterLocation({ ...filterLocation, wards });
                          }}
                          options={filterLocation.districts?.map(
                            (district) => ({
                              label: district.district_name,
                              value: district.district_name,
                            })
                          )}
                          label="Quận / Huyện"
                          placeholder="Chọn quận huyện"
                        />
                      </div>

                      <div>
                        <SelectForm
                          allowClear
                          size="middle"
                          required
                          name={'ward'}
                          options={filterLocation.wards?.map((ward) => ({
                            label: ward.ward_name,
                            value: ward.ward_name,
                          }))}
                          label="Phường xã"
                          placeholder="Chọn phường xã"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}>
                      <RadioGroup.Label className="text-lg font-medium text-gray-900">
                        Phương thức vận chuyển
                      </RadioGroup.Label>

                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {deliveryMethods.map((deliveryMethod) => (
                          <RadioGroup.Option
                            key={deliveryMethod.id}
                            value={deliveryMethod}
                            className={({ checked, active }) =>
                              classNames(
                                checked
                                  ? 'border-transparent'
                                  : 'border-gray-300',
                                active ? 'ring-2 ring-[#00a854]' : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                              )
                            }>
                            {({ checked, active }) => (
                              <>
                                <span className="flex flex-1">
                                  <span className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className="block text-sm font-medium text-gray-900">
                                      {deliveryMethod.title}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-1 flex items-center text-sm text-gray-500">
                                      {deliveryMethod.turnaround}
                                    </RadioGroup.Description>
                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-6 text-sm font-medium text-gray-900">
                                      {deliveryMethod.price}
                                    </RadioGroup.Description>
                                  </span>
                                </span>
                                {checked ? (
                                  <CheckCircleIcon
                                    className="h-5 w-5 text-[#00a854]"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-[#00a854]'
                                      : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Payment */}
                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">
                      Thanh toán
                    </h2>

                    <div className="mt-4">
                      <div className="sr-only">Phương thức thanh toán</div>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {paymentMethods.map(
                          (paymentMethod, paymentMethodIdx) => (
                            <div
                              key={paymentMethod.id}
                              className="flex items-center">
                              {paymentMethodIdx === 0 ? (
                                <Input
                                  id={paymentMethod.id}
                                  name="payment-type"
                                  type="radio"
                                  defaultChecked
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              ) : (
                                <Input
                                  id={paymentMethod.id}
                                  name="payment-type"
                                  type="radio"
                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                              )}

                              <label
                                htmlFor={paymentMethod.id}
                                className="ml-3 block text-sm font-medium text-gray-700">
                                {paymentMethod.title}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                      <div className="col-span-4">
                        <label
                          htmlFor="card-number"
                          className="block text-sm font-medium text-gray-700">
                          Số thẻ
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full rounded-md border-gray-300 shadow-sm Input"
                          />
                        </div>
                      </div>

                      <div className="col-span-4">
                        <label
                          htmlFor="name-on-card"
                          className="block text-sm font-medium text-gray-700">
                          Tên chủ thẻ
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            id="name-on-card"
                            name="name-on-card"
                            autoComplete="cc-name"
                            className="block w-full rounded-md border-gray-300 shadow-sm Input"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label
                          htmlFor="expiration-date"
                          className="block text-sm font-medium text-gray-700">
                          Ngày hết hạn (MM/YY)
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full rounded-md border-gray-300 shadow-sm Input"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="cvc"
                          className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full rounded-md border-gray-300 shadow-sm Input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0 bg-[white] p-6 h-fit border rounded-[8px]">
                  <h2 className="text-lg font-medium text-gray-900">
                    Tổng kết đơn hàng
                  </h2>
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex px-4 py-6 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={''}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <div className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.name}
                                </div>
                              </h4>

                              <p className="mt-1 text-sm text-gray-500">
                                product variants
                              </p>
                            </div>

                            <div className="ml-4 flow-root flex-shrink-0">
                              <button
                                onClick={() => {
                                  setProductsDelete(product);
                                  setOpenConfirmDelete(true);
                                }}
                                type="button"
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                                <TrashIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {convertVnd(product.price)}
                            </p>

                            <div className="ml-4">
                              <label
                                htmlFor="quantity"
                                className="sr-only">
                                Quantity
                              </label>
                              <div id="quantity">
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-4">
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
                  </div>
                  <div className="mt-6">
                    <Button
                      size="large"
                      loading={confirmLoading}
                      onClick={handleOkButtonPayment}
                      htmlType="button"
                      type="primary"
                      className="bg-[#eb1c48] text-white w-full font-medium">
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
