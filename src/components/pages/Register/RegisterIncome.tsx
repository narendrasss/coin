import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './Register.module.scss';
import { LinkButton, BackButton } from '../../buttons';
import { IFixedExpense } from '../../../types';
import { NameAmountInput, TextInput } from '../../form';
import AddButton from '../../buttons/AddButton/AddButton';
import MainContainer from '../MainContainer/MainContainer';

interface RegisterIncomeProps extends RouteComponentProps {
  income: number;
  fixedExpenses: IFixedExpense[];
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  handleFixedExpenseChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  handleFixedExpenseAdd: React.MouseEventHandler;
  handleFixedExpenseDelete: (e: React.MouseEvent, name: string) => void;
}

const RegisterIncome: React.FC<RegisterIncomeProps> = ({
  income,
  fixedExpenses,
  handleTextChange,
  handleFixedExpenseChange,
  handleFixedExpenseAdd,
  handleFixedExpenseDelete
}) => (
  <MainContainer>
    <BackButton to="/register" />
    <header className={style.header}>
      <h1>Create an Account</h1>
      <p className={style.subtitle}>Step 2 of 4 &mdash; Income</p>
    </header>
    <form className={style.form}>
      <TextInput
        label="What's your monthly income?"
        name="income"
        value={income}
        onChange={handleTextChange}
        type="number"
        required
      />
      <p>Do you have any fixed expenses per month? If so, what are they?</p>
      <div>
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
      <AddButton onAdd={handleFixedExpenseAdd} />
    </form>
    <LinkButton
      to="../categories"
      icon="arrow-right"
      style={{ display: 'flex', justifyContent: 'center' }}
    />
  </MainContainer>
);

export default RegisterIncome;
