import React, { FC } from 'react';
import { ICategory } from '../../../../types';
import CategoryInfoListItem from './CategoryInfoListItem';

type Props = {
  categories: ICategory[];
};

const CategoryInfoList: FC<Props> = ({ categories }) => {
  return (
    <div>
      {categories.map(ctg => (
        <CategoryInfoListItem key={ctg._id} {...ctg} />
      ))}
    </div>
  );
};

export default CategoryInfoList;
