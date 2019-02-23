import * as React from 'react';
import style from './MainContainer.module.scss';

const MainContainer: React.FC = ({ children }) => (
  <main className={style.container}>{children}</main>
);

export default MainContainer;
