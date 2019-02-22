import React from 'react';
import Button from '../Button/Button';

interface Props {
  onclick?: () => void;
  style?: React.CSSProperties;
}

class ActionButton extends React.Component<Props, {}> {
  public render() {
    const { onclick, style, children } = this.props;
    return (
      <div onClick={onclick}>
        <Button style={{ display: 'flex', justifyContent: 'center' }}>{children}</Button>
      </div>
    );
  }
}

export default ActionButton;
