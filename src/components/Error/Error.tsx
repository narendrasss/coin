import * as React from 'react';
import style from './Error.module.scss';

const Error: React.FC = ({ children }) => <div className={style.container}>{children}</div>;

export default Error;
