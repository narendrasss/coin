import * as React from 'react';

interface Props {
  name: string;
  change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  style?: React.CSSProperties;
}

const DropDown: React.FC<Props> = ({ name, change, options, style }) => (
  <label htmlFor={name}>
    <div style={style}>
      <select id={name} value={name} onChange={change} onBlur={change}>
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
