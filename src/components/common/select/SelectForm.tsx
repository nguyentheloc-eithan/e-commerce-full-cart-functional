import { Form, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { SelectItemFormProps } from '@/common/types/props/select-form';

const style = {
  alignLabel: 'block text-sm font-medium text-gray-700',
  label: 'mb-0 not-italic font-normal text-md leading-5 text-gray-900',
  subLabel: 'text-xs text-[#B9BDC1] ml-1',
  inputBox:
    'w-[100%]  mt-[-8px] not-italic text-base leading-5 tracking-[0.5px] text-[#36383A] rounded-lg flex items-center',
  icon: { color: '#36383A', fontSize: 14 },
};

const SelectInput = (props: SelectItemFormProps) => {
  const {
    name,
    label,
    subLabel,
    required,
    message = '',
    value,
    options,
    size,
    disabled,
    placeholder,
    isSearch,
    setValue,
    initialValue,
    readOnly,
    onSelect,
    allowClear = true,
    onChange,
    mode = undefined,
  } = props;

  return (
    <Form.Item
      name={name}
      className={style.label}
      style={readOnly ? { pointerEvents: 'none' } : {}}
      label={
        label && (
          <div className={style.alignLabel}>
            <span>{label}</span>
            <span className={style.subLabel}>{subLabel}</span>
          </div>
        )
      }
      initialValue={initialValue}
      rules={[
        {
          required: required ? true : false,
          message: message != '' ? message : 'Please enter ' + label,
        },
      ]}>
      <Select
        onChange={(e) => {
          setValue ? setValue(e) : undefined;
          if (onChange) onChange(e);
        }}
        value={value}
        allowClear={allowClear}
        showSearch={isSearch}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 shadow-sm"
        suffixIcon={
          <ChevronDownIcon
            width={15}
            height={15}
          />
        }
        size={size}
        mode={mode}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        onSelect={onSelect}
        options={options}
        disabled={disabled}></Select>
    </Form.Item>
  );
};

export default SelectInput;
