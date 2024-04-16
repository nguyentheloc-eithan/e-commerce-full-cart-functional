'use client';
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { FormLoginProps } from '@/common/types/props/form-auth';
import useUserLogin from '@/common/stores/user/user-login';
import { useRouter } from 'next/navigation';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  message.error('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const FormLogin = ({ setActiveRegister }: FormLoginProps) => {
  const router = useRouter();
  const { userLogin, setUserLogin } = useUserLogin();

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const onFinish = () => {
    const userLoginCheck = { ...userLogin };
    userLogin.name = userName;
    setUserLogin(userLoginCheck);
    console.log('user login Name: ' + userLogin.name);
    message.success('Đăng nhập thành công');
    router.push('/');
  };
  return (
    <div className="bg-[white] w-[500px] h-[500px] rounded-[1rem] flex  items-center justify-center px-[4rem]">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout={'vertical'}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="w-full">
        <div className="my-[1rem] w-full text-center text-bold text-[32px] font-[700] text-[#eb1c48]">
          Đăng nhập
        </div>
        <Form.Item<FieldType>
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: 'Hãy điền tên đăng nhập!' }]}>
          <Input
            size="large"
            onChange={(e: any) => setUserName(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Hãy điền mật khẩu!' }]}>
          <Input.Password
            size="large"
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          className="flex  items-center justify-between">
          <Checkbox>Remember me</Checkbox>

          <span className="text-end ml-[3rem] italic">
            Bạn chưa có tài khoản?
            <span
              onClick={() => {
                setActiveRegister(true);
              }}
              className="text-[#eb1c48] font-[500] cursor-pointer hover:text-[#f64f73e9]">
              {' '}
              Đăng ký
            </span>
          </span>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            className="bg-[#eb1c48]"
            type="primary"
            htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormLogin;
