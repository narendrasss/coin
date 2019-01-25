import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const Button = props => {
  const { to, text } = props;
  return (
    <Link to={to}>
      <div className="Button">{text}</div>
    </Link>
  );
};

Button.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
