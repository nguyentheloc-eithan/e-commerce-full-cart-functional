'use client';
import { ILocation, IProvince } from '@/common/types/location';
import InputForm from '@/components/common/input/InputForm';
import InputPhone from '@/components/common/input/InputPhone';
import SelectForm from '@/components/common/select/SelectForm';
import { supabase } from '@/services/api/supabase/supabase-client';
import { PhoneOutlined } from '@ant-design/icons';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Form, Input } from 'antd';
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

export default function CheckoutCard() {
  const [open, setOpen] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [provinces, setProvinces] = useState<IProvince[]>([] as IProvince[]);
  const [filterLocation, setFilterLocation] = useState<ILocation>(
    {} as ILocation
  );
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
  return (
    <div className="bg-white w-fit">
      <main className="mx-auto max-w-2xl px-4 pb-24  sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <Form
            layout="vertical"
            className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
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
                      options={filterLocation.districts?.map((district) => ({
                        label: district.district_name,
                        value: district.district_name,
                      }))}
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
                    Delivery method
                  </RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-indigo-500' : '',
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
                                className="h-5 w-5 text-indigo-600"
                                aria-hidden="true"
                              />
                            ) : null}
                            <span
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked
                                  ? 'border-indigo-500'
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
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
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
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700">
                      Card number
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
                      Name on card
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
                      Expiration date (MM/YY)
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
          </Form>
        </div>
      </main>
    </div>
  );
}
