import * as React from 'react';
import style from '../../Register.module.scss';
import local from './FixedExpenseInput.module.scss';

type Props = {
  name: string;
  amount: number;
  index: number;
  handler: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
};

const FixedExpenseInput: React.FC<Props> = ({ name, amount, index, handler }) => {
  const callHandler: React.ChangeEventHandler<HTMLInputElement> = e => handler(e, index);
  return (
    <div className={local.wrapper}>
      <label htmlFor="name" className={local.name}>
        {!index ? <p className={local.title}>Expense name</p> : null}
        <input
          className={style.inputFe}
          id="name"
          value={name}
          type="text"
          onChange={callHandler}
        />
      </label>
      <label htmlFor="amount" className={local.amount}>
        {!index ? <p className={local.title}>Amount</p> : null}
        <input
          className={style.inputFe}
          id="amount"
          value={amount}
          type="number"
          onChange={callHandler}
        />
      </label>
    </div>
  );
};

export default FixedExpenseInput;
