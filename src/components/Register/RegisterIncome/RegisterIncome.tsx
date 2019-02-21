import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import BackButton from '../../BackButton/BackButton';
import { FixedExpense } from '../../../types';
import FixedExpenseInput from './FixedExpenseInput/FixedExpenseInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '../../LinkButton/LinkButton';

type Props = {
  income: number;
  fixedExpenses: FixedExpense[];
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  handleFixedExpenseChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleAddFixedExpense: React.MouseEventHandler;
  handleDelFixedExpense: (e: React.MouseEvent, idx: number) => void;
};

const RegisterIncome: React.FC<Props & RouteComponentProps> = ({
  income,
  fixedExpenses,
  handleTextChange,
  handleFixedExpenseChange,
  handleAddFixedExpense,
  handleDelFixedExpense
}) => (
  <main className={style.container}>
    <BackButton to="/register" />
    <header className={style.header}>
      <h1>Create an Account</h1>
      <p className={style.subtitle}>Step 2 of 4 &mdash; Income</p>
    </header>
    <form>
      <label htmlFor="income">
        What's your monthly income?
        <input
          className={style.inputActive}
          id="income"
          value={income}
          type="number"
          onChange={handleTextChange}
        />
      </label>
      <p>Do you have any fixed expenses per month? If so, what are they?</p>
      <div style={{ margin: '1.5rem 0' }}>
        {fixedExpenses.map(({ name, amount }, index) => (
          <FixedExpenseInput
            key={['fe', index].join('')}
            name={name}
            amount={amount}
            index={index}
            handler={handleFixedExpenseChange}
            onDelete={handleDelFixedExpense}
          />
        ))}
      </div>
    </form>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        style={{ marginBottom: '1.5rem' }}
        onClick={handleAddFixedExpense}
        className={style.addBtn}
      >
        <FontAwesomeIcon icon="plus" size="lg" />
      </button>
    </div>
    <LinkButton
      to="../categories"
      icon="arrow-right"
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  </main>
);

export default RegisterIncome;
