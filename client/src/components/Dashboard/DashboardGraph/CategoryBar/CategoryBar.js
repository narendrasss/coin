import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from '../../../ProgressBar/ProgressBar';
import './CategoryBar.scss';

const CategoryBar = props => {
  const { proportion, name, amount, spent } = props;
  return (
    <div className="CategoryBar">
      <p className="CategoryBar__proportion">{proportion}%</p>
      <p className="CategoryBar__name">{name}</p>
      <ProgressBar percentage={spent / amount} />
      <p className="CategoryBar__spent opaque">${spent}</p>
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
