import { SizeType } from 'antd/es/config-provider/SizeContext';
import { OptionsType } from '../options-select';

export interface SelectItemFormProps {
  name: string;
  label?: string;
  subLabel?: string;
  required?: boolean;
  message?: string;
  value?: any;
  allowClear?: boolean;
  options: OptionsType[];
  size?: SizeType;
  disabled?: boolean;
  placeholder?: string;
  isSearch?: boolean;
  initialValue?: any;
  setValue?: (v: any) => void;
  readOnly?: boolean;
  onSelect?: (value: string, option?: OptionsType) => void;
  onChange?: any;
  mode?: 'multiple' | 'tags';
}
