import React, { FC } from 'react';
import { Link } from '@reach/router';
import { ICategory } from '../../../../../types';
import style from './CategoryList.module.scss';
import CategoryListItem from './CategoryListItem/CategoryListItem';

const COLORS = ['#FFCE60', '#9555ED', '#76B1F5', '#ED5572', '#1CA279'];

type Props = {
  categories: ICategory[];
};

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className={style.container}>
      {categories.map((ctg, index) => (
        <Link key={ctg._id} to={`/categories/${ctg._id}`}>
          <CategoryListItem color={COLORS[index]} {...ctg} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
