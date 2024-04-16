/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import useUserLogin from '@/common/stores/user/user-login';
import { IProduct } from '@/common/types/product';
import { convertVnd } from '@/utils/format-money';

export default function ConfirmPage() {
  const { userLogin } = useUserLogin();
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    setProducts(userLogin.cart.products);
  }, [userLogin.cart]);
  return (
    <>
      <main className="relative lg:min-h-full">
        <div className="h-fit overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <img
            src="https://images.unsplash.com/photo-1554830072-52d78d0d4c18?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
            <div className="lg:col-start-2">
              <h1 className="text-sm font-medium text-indigo-600">
                Đặt hàng thành công
              </h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                TVL Mart cảm ơn nhé!
              </p>
              <p className="mt-2 text-base text-gray-500">
                Chúng tôi đã nhận được đơn đặt hàng của bạn, chúng tôi hiện đang
                xử lý nó. Vì vậy, hay yên tâm và chúng tôi sẽ sớm gửi cho bạn
                nhé!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Mã đơn hàng</dt>
                <dd className="mt-2 text-indigo-600">#51547878755545848512</dd>
              </dl>

              <ul
                role="list"
                className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex space-x-6 py-6">
                    <img
                      src={product.image}
                      alt={''}
                      className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">{product.name}</h3>

                      <p>{'product variant update later'}</p>
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {convertVnd(product.price)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <dt>Tổng tiền hàng</dt>
                  <dd className="text-gray-900">undefined</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Phí ship</dt>
                  <dd className="text-gray-900">undefined</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Thuế</dt>
                  <dd className="text-gray-900">undefined</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Tổng tất cả</dt>
                  <dd className="text-base">undefined</dd>
                </div>
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
                <div>
                  <dt className="font-bold text-gray-900">
                    Địa chỉ khách nhận
                  </dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      <span className="block">59/11 Đường số 5</span>
                      <span className="block">Tăng Nhơn Phú B</span>
                      <span className="block">Quận 9, TP Hồ Chí Minh</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gray-900">
                    Phương thức thanh toán
                  </dt>
                  <div className="mt-2 space-y-2 sm:flex sm:space-x-4 sm:space-y-0">
                    <div className="flex-auto">
                      <p className="text-gray-900">Thanh toán khi nhận hàng</p>
                    </div>
                  </div>
                </div>
              </dl>

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <a
                  href="/"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Tiếp tục mua hàng
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
