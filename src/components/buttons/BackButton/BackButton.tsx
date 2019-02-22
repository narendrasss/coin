import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './BackButton.module.scss';
import { navigate } from '@reach/router';

type Props = {
  to: string;
};

const BackButton: React.FC<Props> = ({ to }) => {
  return (
    <div className={style.back} onClick={() => navigate(to)}>
      <FontAwesomeIcon icon="arrow-left" size="2x" />
    </div>
  );
};

export default BackButton;
