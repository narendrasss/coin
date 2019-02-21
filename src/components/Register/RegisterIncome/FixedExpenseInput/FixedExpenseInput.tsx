import * as React from 'react';
import style from '../../Register.module.scss';
import local from './FixedExpenseInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  name: string;
  amount: number;
  index: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onDelete: (e: React.MouseEvent, idx: number) => void;
};

const FixedExpenseInput: React.FC<Props> = ({ name, amount, index, handler, onDelete }) => {
  const callHandler: React.ChangeEventHandler<HTMLInputElement> = e => handler(e, index);
  return (
    <>
      {index ? null : (
        <div className={local.title}>
          <p style={{ flex: 2 }}>Expense name</p>
          <p style={{ flex: 1 }}>Amount</p>
        </div>
      )}
      <div className={local.wrapper}>
        <label htmlFor="name" className={local.name}>
          <input
            className={style.inputFe}
            id="name"
            value={name}
            type="text"
            onChange={callHandler}
          />
        </label>
        <label htmlFor="amount" className={local.amount}>
          <input
            className={style.inputFe}
            id="amount"
            value={amount ? amount : ''}
            type="number"
            onChange={callHandler}
          />
        </label>
        <button className={local.button} onClick={e => onDelete(e, index)}>
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </div>
    </>
  );
};

export default FixedExpenseInput;
