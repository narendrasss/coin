import * as React from 'react';
import style from './Tip.module.scss';

const Tip: React.FC = ({ children }) => <blockquote className={style.tip}>{children}</blockquote>;

export default Tip;
