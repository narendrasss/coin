import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './AddButton.module.scss';

type AddButtonProps = { onAdd: React.MouseEventHandler };

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button onClick={onAdd} className={style.btn}>
      <FontAwesomeIcon icon="plus" size="lg" />
    </button>
  </div>
);

export default AddButton;
