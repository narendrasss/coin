import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Button from '../Button/Button';

interface Props {
  to: string;
  icon: IconProp;
  style?: React.CSSProperties;
}

class LinkButton extends React.Component<Props, {}> {
  public render() {
    const { to, children, icon, style } = this.props;
    return (
      <Link to={to}>
        <Button style={style}>
          {children}
          <FontAwesomeIcon icon={icon} />
        </Button>
      </Link>
    );
  }
}

export default LinkButton;
