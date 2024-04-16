import React from 'react';
import { Form, Input } from 'antd';
import { InputFormProps } from '@/common/types/props/input-form';

const InputForm = (props: InputFormProps) => {
  const {
    label,
    name,
    required = false,
    message = '',
    placeholder,
    classNameInput,
    type,
    size = 'medium',
    value,
    onChange,
  } = props;
  const style = {
    alignLabel: 'block text-sm font-medium text-gray-700',
    label: 'mb-0 not-italic font-normal text-md leading-5 text-gray-900',
    subLabel: 'text-xs text-[#B9BDC1] ml-1',
    inputBox: `px-3 py-[6px] w-[100%] mt-[-18px] d-block w-100 not-italic font-normal text-base tracking-[0.5px] text-[#36383A] rounded-lg border-solid border-1px border-[#B9BDC1]`,
    icon: { color: '#36383A', fontSize: 20 },
  };
  return (
    <Form.Item
      className="w-[100%] mb-0 not-italic font-normal text-sm leading-5 text-gray-900 relative before:invisible"
      label={<div className={style.alignLabel}>{label}</div>}
      name={name}
      rules={[
        {
          required: required,
          message: message != '' ? message : 'Please enter ' + label,
        },
      ]}>
      <Input
        size={size as any}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 shadow-sm"
      />
    </Form.Item>
  );
};

export default InputForm;
