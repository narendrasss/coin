import React from 'react';
import scss from './Button.module.scss';

interface Props {
  style?: React.CSSProperties;
}

class Button extends React.Component<Props, {}> {
  public render() {
    const { style, children } = this.props;
    return (
      <div style={style} className={scss.btn}>
        {children}
      </div>
    );
  }
}

export default Button;
