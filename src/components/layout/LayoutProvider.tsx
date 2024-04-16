'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ConfigProvider, Drawer } from 'antd';
import HeaderNav from './HeaderNav';
import themeConfig from '@/utils/theme/theme-config';
const LayoutProvider = ({ children }: any) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const onHandleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <ConfigProvider theme={themeConfig}>
      {pathname !== '/login' && pathname !== '/register' && (
        <HeaderNav
          openMenu={openMenu}
          onHandleToggleMenu={onHandleToggleMenu}
        />
      )}
      <main>
        <Drawer
          title="TVL Mart"
          closeIcon={true}
          width={200}
          placement={'left'}
          closable={false}
          onClose={onHandleToggleMenu}
          open={openMenu}>
          <p></p>
        </Drawer>{' '}
        {children}
      </main>
      {/* <AntdStyledRegistry>{children}</AntdStyledRegistry> */}
    </ConfigProvider>
  );
};

export default LayoutProvider;
