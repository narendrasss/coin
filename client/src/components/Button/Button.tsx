import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import scss from './Button.module.scss';

interface Props {
  to: string;
  style?: React.CSSProperties;
}

class Button extends React.Component<Props, {}> {
  public render() {
    const { to, children, style } = this.props;
    return (
      <Link to={to}>
        <div style={style} className={scss.btn}>
          {children}
          <FontAwesomeIcon className={scss.icon} icon="angle-right" />
        </div>
      </Link>
    );
  }
}

export default Button;
