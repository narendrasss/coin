import React from 'react';
import { Link } from '@reach/router';

import './Button.scss';

interface Props {
  to: string;
}

class Button extends React.Component<Props, {}> {
  public render() {
    const { to, children } = this.props;
    return (
      <Link to={to}>
        <div className="Button">{children}</div>
      </Link>
    );
  }
}

export default Button;
