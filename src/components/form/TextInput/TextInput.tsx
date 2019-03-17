import * as React from 'react';
import styles from './TextInput.module.scss';

type BaseProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  style?: React.CSSProperties;
};

type TextInputProps = BaseProps & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  type = 'text',
  onChange,
  style,
  ...rest
}) => (
  <label style={style} htmlFor={name}>
    {label}
    <input
      className={styles.input}
      name={name}
      value={value}
      type={type}
      onChange={e => (e.preventDefault(), onChange(e))}
      {...rest}
    />
  </label>
);

export default TextInput;
