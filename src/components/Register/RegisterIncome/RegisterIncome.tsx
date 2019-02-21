import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import LinkButton from '../../LinkButton/LinkButton';
import BackButton from '../../BackButton/BackButton';
import { FixedExpense } from '../../../types';
import FixedExpenseInput from './FixedExpenseInput/FixedExpenseInput';

type Props = {
  income: string;
  fixedExpenses: FixedExpense[];
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  handleFixedExpenseChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
};

const RegisterIncome: React.FC<Props & RouteComponentProps> = ({
  income,
  fixedExpenses,
  handleTextChange,
  handleFixedExpenseChange
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
      <div style={{ marginTop: '1.5rem' }}>
        {fixedExpenses.map(({ name, amount }, index) => (
          <FixedExpenseInput
            key={['fe', index].join()}
            name={name}
            amount={amount}
            index={index}
            handler={handleFixedExpenseChange}
          />
        ))}
      </div>
      <LinkButton
        to="./income"
        icon="arrow-right"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}
      />
    </form>
  </main>
);

export default RegisterIncome;
