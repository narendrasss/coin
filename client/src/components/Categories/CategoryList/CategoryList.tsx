import * as React from 'react';
import { Category } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  categories: Category[];
};

const CategoryList: React.FC<Props> = props => {
  const { categories } = props;
  return (
    <ul>
      {categories.map(ctg => {
        const { name, amount } = ctg;
        return (
          <li>
            <p>{name}</p>
            <p>{amount.toLocaleString()}</p>
            <FontAwesomeIcon icon="angle-right" />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
