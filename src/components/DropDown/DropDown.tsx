import * as React from 'react';

interface Props {
  name: string;
  change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

class DropDown extends React.Component<Props, {}> {
  public render() {
    const { name, change, options } = this.props;
    return (
      <label htmlFor={name}>
        <select id={name} value={name} onChange={change} onBlur={change}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default DropDown;
