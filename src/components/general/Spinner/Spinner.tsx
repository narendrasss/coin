import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import style from './Spinner.module.scss';

const Spinner: React.FC<{ size?: SizeProp }> = ({ size = '1x' }) => (
  <FontAwesomeIcon className={style.spinner} icon="spinner" size={size} />
);

export default Spinner;
