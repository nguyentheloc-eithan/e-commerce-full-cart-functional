export interface InputFormProps {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  required?: boolean;
  classNameInput?: string;
  message?: string;
  size?: string;
  type?: string;
  onChange?: (value: any) => void;
}
