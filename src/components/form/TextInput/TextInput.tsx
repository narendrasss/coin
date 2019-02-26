import * as React from 'react';
import style from './TextInput.module.scss';

interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  opts?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  opts
}) => (
  <label htmlFor={name}>
    {label}
    <input
      className={style.input}
      name={name}
      value={value}
      type={type}
      onChange={e => (e.preventDefault(), onChange(e))}
      {...opts}
    />
  </label>
);

export default TextInput;
