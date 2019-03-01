import React, { FC, ChangeEventHandler } from 'react';
import style from './DropDown.module.scss';

interface Props {
  name: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  def?: string;
}

const DropDown: FC<Props> = ({ name, options, onChange, def }) => (
  <label htmlFor={name}>
    <div className={style.select}>
      <select id={name} value={name} onChange={onChange} onBlur={onChange}>
        {def ? (
          <option value="" disabled selected>
            {def}
          </option>
        ) : null}
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </label>
);

export default DropDown;
