import { Fragment } from 'react';
import { Tab } from '@headlessui/react';

const tabs = [
  {
    name: 'Vì sao?',
    features: [
      {
        name: 'Lý do nên chọn TML Mart',
        description:
          'Bộ cơ sở Tổ chức cho phép bạn định cấu hình và phát triển thiết lập của mình khi các mục và thói quen của bạn thay đổi. Các khay đi kèm và các tiện ích bổ sung tùy chọn có thể dễ dàng được sắp xếp lại để đạt được thiết lập hoàn hảo đó.',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-01.jpg',
        imageAlt:
          'Maple organizer base with slots, supporting white polycarbonate trays of various sizes.',
      },
    ],
  },
  {
    name: 'Sản Phẩm',
    features: [
      {
        name: 'Chất lượng sản phầm',
        description:
          'Tổ chức có các lựa chọn về vật liệu nền là gỗ óc chó phong phú và gỗ phong tươi sáng. Tạo điểm nhấn cho bàn làm việc của bạn bằng vật liệu tương phản hoặc kết hợp các loại gỗ tương tự để có cái nhìn điềm tĩnh và gắn kết. Mỗi phần đế đều được chà nhám bằng tay và hoàn thiện.',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-02.jpg',
        imageAlt:
          'Walnut organizer base with pen, sticky note, phone, and bin trays, next to modular drink coaster attachment.',
      },
    ],
  },
  {
    name: 'Tiện ịch',
    features: [
      {
        name: 'Các sản phẩm hữu ích',
        description:
          'Khách hàng của chúng tôi sử dụng Tổ chức khắp nhà để mang lại hiệu quả cho nhiều công việc hàng ngày. Tận hưởng Sắp xếp trong không gian làm việc, nhà bếp, phòng khách, lối vào, nhà để xe, v.v. Chúng tôi nóng lòng muốn xem bạn sẽ sử dụng nó như thế nào!',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-03.jpg',
        imageAlt:
          'Walnut organizer base with white polycarbonate trays in the kitchen with various kitchen utensils.',
      },
    ],
  },
  {
    name: 'Ưu đãi',
    features: [
      {
        name: "Everything you'll need",
        description:
          'Bộ cơ sở Tổ chức cho phép bạn định cấu hình và phát triển thiết lập của mình khi các mục và thói quen của bạn thay đổi. Các khay đi kèm và các tiện ích bổ sung tùy chọn có thể dễ dàng được sắp xếp lại để đạt được thiết lập hoàn hảo đó.',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/product-feature-06-detail-04.jpg',
        imageAlt:
          'Walnut organizer system on black leather desk mat on top of white desk.',
      },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductFeature() {
  return (
    <div className="bg-white">
      <section
        aria-labelledby="features-heading"
        className="mx-auto max-w-7xl py-32 sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
          <div className="max-w-3xl">
            <h2
              id="features-heading"
              className="text-3xl font-bold tracking-tight text-[#eb1c48] sm:text-4xl">
              Hãy chọn TVL Mart
            </h2>
            <p className="mt-4 text-gray-500">
              Chúng tôi có Hệ thống mô-đun Tổ chức cung cấp vô số tùy chọn để
              sắp xếp các mục yêu thích và được sử dụng nhiều nhất của bạn. Giữ
              mọi thứ trong tầm tay và đúng vị trí, đồng thời trang trí không
              gian làm việc của bạn.
            </p>
          </div>

          <Tab.Group
            as="div"
            className="mt-4">
            <div className="-mx-4 flex overflow-x-auto sm:mx-0">
              <div className="flex-auto border-b border-gray-200 px-4 sm:px-0">
                <Tab.List className="-mb-px flex space-x-10">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? 'border-[#eb1c48] text-[#eb1c48]'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                        )
                      }>
                      {tab.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
            </div>

            <Tab.Panels as={Fragment}>
              {tabs.map((tab) => (
                <Tab.Panel
                  key={tab.name}
                  className="space-y-16 pt-10 lg:pt-16">
                  {tab.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8">
                      <div className="mt-6 lg:col-span-5 lg:mt-0">
                        <h3 className="text-lg font-medium text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                      <div className="lg:col-span-7">
                        <div className="aspect-h-1 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:aspect-h-2 sm:aspect-w-5">
                          <img
                            src={feature.imageSrc}
                            alt={feature.imageAlt}
                            className="object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
}
