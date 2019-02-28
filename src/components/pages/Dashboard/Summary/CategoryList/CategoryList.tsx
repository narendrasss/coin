import React, { FC } from 'react';
import { Link } from '@reach/router';
import { ICategory } from '../../../../../types';
import style from './CategoryList.module.scss';
import CategoryListItem from './CategoryListItem/CategoryListItem';

type Props = {
  categories: ICategory[];
};

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className={style.container}>
      {categories.map(ctg => (
        <Link to={`/ctg/${ctg.name.toLowerCase()}`}>
          <CategoryListItem {...ctg} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
