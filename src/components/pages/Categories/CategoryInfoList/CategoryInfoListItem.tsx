import React, { FC } from 'react';
import { ICategory } from '../../../../types';
import style from './CategoryInfoListItem.module.scss';

const CategoryInfoListItem: FC<ICategory> = ({ name, budget, spent }) => {
  return (
    <div className={style.container}>
      <p>{name}</p>
      <p>${spent.toFixed(2)}</p>
    </div>
  );
};

export default CategoryInfoListItem;
