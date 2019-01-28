import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

const ProgressBar = props => {
  const { percentage } = props;
  const style = {
    width: `${percentage * 100}%`
  };
  return (
    <div className="ProgressBar">
      <div className="Progress">
        <div className="Progress__circle Progress__circle--left" />
        <div style={style} className="bar" />
        <div className="Progress__circle Progress__circle--right" />
      </div>
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
