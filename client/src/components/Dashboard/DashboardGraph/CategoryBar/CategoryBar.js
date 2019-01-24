import React from 'react';
import PropTypes from 'prop-types';

const CategoryBar = props => {
  const { proportion, name, amount, spent } = props;
  return (
    <div className="CategoryBar">
      <p>{proportion}%</p>
      <p>{name}</p>
      <p>${spent} spent</p>
    </div>
  );
};

CategoryBar.propTypes = {
  proportion: PropTypes.number,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number,
  spent: PropTypes.number
};

CategoryBar.defaultProps = {
  proportion: 0,
  amount: 0,
  spent: 0
};

export default CategoryBar;
