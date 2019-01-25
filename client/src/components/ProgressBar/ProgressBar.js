import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

const ProgressBar = props => {
  const { percentage } = props;
  const style = {
    transform: `scaleX(${percentage})`
  };
  return (
    <div className="ProgressBar">
      <div style={style} className="Progress" />
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number
};

ProgressBar.defaultProps = {
  percentage: 0
};

export default ProgressBar;
