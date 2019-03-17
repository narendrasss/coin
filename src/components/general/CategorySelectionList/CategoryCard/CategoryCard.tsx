import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './CategoryCard.module.scss';

type Props = {
  name: string;
  index: number;
  onAdd: (e: React.MouseEvent, name: string, amount?: number) => void;
  onDelete: (e: React.MouseEvent, name: string) => void;
  clicked: boolean;
};

const CategoryCard: React.FC<Props> = ({ name, onAdd, onDelete, clicked }) => {
  const handleClick: React.MouseEventHandler = e => {
    const updateClick = !clicked;
    if (updateClick) {
      onAdd(e, name);
    } else onDelete(e, name);
  };

  return (
    <li onClick={handleClick} className={clicked ? style.active : style.container}>
      {name}
      <FontAwesomeIcon icon={clicked ? 'minus' : 'plus'} />
    </li>
  );
};

export default CategoryCard;
