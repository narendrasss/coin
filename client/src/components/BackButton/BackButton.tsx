import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './BackButton.module.scss';

const BackButton: React.FC = props => {
  return (
    <div className={style.back} onClick={() => window.history.back()}>
      <FontAwesomeIcon icon="arrow-left" size="2x" />
    </div>
  );
};

export default BackButton;
