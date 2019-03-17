import React from 'react';
import CategoryCard from './CategoryCard/CategoryCard';

type Props = {
  categories: string[];
  onAdd: (e: React.MouseEvent, name: string, amount?: number) => void;
  onDelete: (e: React.MouseEvent, name: string) => void;
  getClicked: (name: string) => boolean;
  style?: React.CSSProperties;
};

const CategorySelectionList: React.FC<Props> = ({
  categories,
  onAdd,
  onDelete,
  getClicked,
  style
}) => {
  return (
    <ul style={{ ...style, listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
      {categories.map((name, index) => (
        <CategoryCard
          key={['cc', index].join('')}
          name={name}
          index={index}
          onAdd={onAdd}
          onDelete={onDelete}
          clicked={getClicked(name)}
        />
      ))}
    </ul>
  );
};

export default CategorySelectionList;
