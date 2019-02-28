import React, { FC, CSSProperties } from 'react';
import localStyle from './MainContainer.module.scss';

type Props = { style?: CSSProperties };

const MainContainer: FC<Props> = ({ style, children }) => (
  <main style={style} className={localStyle.container}>
    {children}
  </main>
);

export default MainContainer;
