import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './Register.module.scss';
import { BackButton, ActionButton } from '../../buttons';
import { Tip } from '../../general';

type Props = {
  goal: string;
  amount: number;
  due: string;
  payment: number;
  handleGoalChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDueChange: React.ChangeEventHandler<HTMLInputElement>;
  handleAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
};

const RegisterGoal: React.FC<Props & RouteComponentProps> = ({
  goal,
  amount,
  due,
  payment,
  handleGoalChange,
  handleDueChange,
  handleAmountChange,
  handleSubmit
}) => {
  return (
    <main className={style.container}>
      <BackButton to="categories" />
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 4 of 4 &mdash; Goal</p>
        <p className={style.text}>Last one - we promise!</p>
      </header>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="goal">
          What do you want to save for?
          <input
            className={style.inputActive}
            id="goal"
            type="text"
            value={goal}
            onChange={handleGoalChange}
          />
        </label>
        <label htmlFor="amount">
          How much do you need?
          <input
            className={style.inputActive}
            id="amount"
            type="number"
            value={amount ? amount : ''}
            onChange={handleAmountChange}
          />
        </label>
        <label htmlFor="due">
          When do you need it by?
          <input
            className={style.inputActive}
            id="due"
            type="date"
            value={due}
            onChange={handleDueChange}
          />
        </label>
        <Tip>
          You'll need to save {payment.toLocaleString('en', { style: 'currency', currency: 'usd' })}{' '}
          per month to make this goal. Don't worry, you got this!
        </Tip>
        <ActionButton onclick={handleSubmit}>Sign up</ActionButton>
      </form>
    </main>
  );
};

export default RegisterGoal;
