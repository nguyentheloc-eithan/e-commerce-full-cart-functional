import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import Lottie from 'lottie-react';
import removeCart from '../../../../public/lottie/removeCart.json';
const { Text } = Typography;

interface ModalConfirmProps {
  onOk: any;
  onCancel: any;
  open: boolean;
}
const ModalConfirm = ({ onOk, onCancel, open }: ModalConfirmProps) => {
  return (
    <Modal
      centered
      className="flex items-center justify-center"
      title={
        <Text
          className="font-[700] lg:text-[24px] text-center flex items-center justify-center"
          type="danger">
          Xóa sản phẩm này?
        </Text>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onOk}
          className="text-white bg-[#eb1c48]">
          Xác nhận
        </Button>,
      ]}>
      <Lottie
        animationData={removeCart}
        loop={true}
        className="w-[200px] lg:w-[350px] lg:h-[300px] object-cover"
      />
    </Modal>
  );
};

export default ModalConfirm;
