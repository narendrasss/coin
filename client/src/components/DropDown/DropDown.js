import React from 'react';
import PropTypes from 'prop-types';

const DropDown = props => {
  const { name, change, options } = props;
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
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DropDown;
