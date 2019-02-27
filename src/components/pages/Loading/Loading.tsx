import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <main className={style.container}>
      <FontAwesomeIcon className={style.spinner} icon="spinner" size="5x" />
    </main>
  );
};

export default Loading;
