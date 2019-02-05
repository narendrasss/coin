import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import scss from './LinkButton.module.scss';

interface Props {
  to: string;
  style?: React.CSSProperties;
}

class LinkButton extends React.Component<Props, {}> {
  public render() {
    const { to, children, style } = this.props;
    return (
      <Link to={to}>
        <Button style={style}>
          {children}
          <FontAwesomeIcon className={scss.icon} icon="angle-right" />
        </Button>
      </Link>
    );
  }
}

export default LinkButton;
