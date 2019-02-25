import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './Register.module.scss';
import { LinkButton, BackButton } from '../../buttons';
import { FixedExpense } from '../../../types';
import { NameAmountInput } from '../../form';
import AddButton from '../../buttons/AddButton/AddButton';

type Props = {
  income: number;
  fixedExpenses: FixedExpense[];
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  handleFixedExpenseChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleFixedExpenseAdd: React.MouseEventHandler;
  handleFixedExpenseDelete: (e: React.MouseEvent, name: string) => void;
};

const RegisterIncome: React.FC<Props & RouteComponentProps> = ({
  income,
  fixedExpenses,
  handleTextChange,
  handleFixedExpenseChange,
  handleFixedExpenseAdd,
  handleFixedExpenseDelete
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
          <NameAmountInput
            key={['fe', index].join('')}
            title={['expense', 'amount']}
            name={name}
            amount={amount}
            index={index}
            handler={handleFixedExpenseChange}
            onDelete={handleFixedExpenseDelete}
          />
        ))}
      </div>
    </form>
    <AddButton onAdd={handleFixedExpenseAdd} />
    <LinkButton
      to="../categories"
      icon="arrow-right"
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  </main>
);

export default RegisterIncome;
