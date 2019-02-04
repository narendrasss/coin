import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './BackButton.module.scss';
import { navigate } from '@reach/router';

type Props = {
  target: string;
};

const BackButton: React.FC<Props> = props => {
  const { target } = props;
  return (
    <div className={style.back} onClick={() => navigate(target)}>
      <FontAwesomeIcon icon="arrow-left" size="2x" />
    </div>
  );
};

export default BackButton;
