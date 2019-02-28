import * as React from 'react';
import style from './Loading.module.scss';
import { Spinner } from '../../general';

const Loading: React.FC = () => {
  return (
    <main className={style.container}>
      <Spinner size="5x" />
    </main>
  );
};

export default Loading;
