import * as React from 'react';
import style from './NameAmountInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  title: string[];
  name: string;
  amount: number;
  index: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onDelete: (e: React.MouseEvent, name: string) => void;
};

const NameAmountInput: React.FC<Props> = ({ title, name, amount, index, handler, onDelete }) => {
  const callHandler: React.ChangeEventHandler<HTMLInputElement> = e => handler(e, index);
  return (
    <>
      {index ? null : (
        <div className={style.title}>
          <p style={{ flex: 2 }}>{title[0]} name</p>
          <p style={{ flex: 1 }}>{title[1]}</p>
        </div>
      )}
      <div className={style.wrapper}>
        <label htmlFor="name" className={style.name}>
          <input
            className={style.input}
            id="name"
            value={name}
            type="text"
            onChange={callHandler}
          />
        </label>
        <label htmlFor="amount" className={style.amount}>
          <input
            className={style.input}
            id="amount"
            value={amount ? amount : ''}
            type="number"
            onChange={callHandler}
          />
        </label>
        <button className={style.button} onClick={e => onDelete(e, name)}>
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </div>
    </>
  );
};

export default NameAmountInput;
