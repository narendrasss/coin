import React from 'react';
import scss from './Button.module.scss';

interface Props {
  type?: string;
  style?: React.CSSProperties;
  onclick?: React.MouseEventHandler;
}

const Button: React.FC<Props> = ({ style, type = 'default', onclick, children }) => {
  return (
    <button style={style} className={[scss.btn, scss[type]].join(' ')} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
