import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './CategoryListItem.module.scss';
import { ProgressBar } from '../../../../../general';

type Props = {
  name: string;
  budget: number;
  spent: number;
};

const CategoryListItem: FC<Props> = ({ name, budget, spent }) => (
  <div className={style.container}>
    <p style={{ flex: 2 }}>{name}</p>
    <ProgressBar style={{ flex: 2.5 }} percentage={spent / budget} />
    <p className={style.spent}>${spent.toLocaleString()}</p>
    <FontAwesomeIcon icon="angle-right" />
  </div>
);

export default CategoryListItem;
