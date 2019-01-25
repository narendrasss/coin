import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import './Button.scss';

const Button = props => {
  const { to, children } = props;
  return (
    <Link to={to}>
      <div className="Button">{children}</div>
    </Link>
  );
};

Button.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Button;
