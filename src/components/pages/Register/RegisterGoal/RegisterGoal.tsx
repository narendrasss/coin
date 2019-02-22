import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import { BackButton, ActionButton } from '../../../buttons';
import { Tip } from '../../../general';

type Props = {
  goalFor: string;
  goalAmount: number;
  goalDue: string;
  goalPayment: number;
  onForChange: React.ChangeEventHandler<HTMLInputElement>;
  onDueChange: React.ChangeEventHandler<HTMLInputElement>;
  onNumChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
};

const RegisterGoal: React.FC<Props & RouteComponentProps> = ({
  goalFor,
  goalAmount,
  goalDue,
  goalPayment,
  onForChange,
  onDueChange,
  onNumChange,
  onSubmit
}) => {
  return (
    <main className={style.container}>
      <BackButton to="categories" />
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 4 of 4 &mdash; Goal</p>
        <p className={style.text}>Last one - we promise!</p>
      </header>
      <form className={style.form} onSubmit={onSubmit}>
        <label htmlFor="goalFor">
          What do you want to save for?
          <input
            className={style.inputActive}
            id="goalFor"
            type="text"
            value={goalFor}
            onChange={onForChange}
          />
        </label>
        <label htmlFor="goalAmount">
          How much do you need?
          <input
            className={style.inputActive}
            id="goalAmount"
            type="number"
            value={goalAmount ? goalAmount : ''}
            onChange={onNumChange}
          />
        </label>
        <label htmlFor="goalDue">
          When do you need it by?
          <input
            className={style.inputActive}
            id="goalDue"
            type="date"
            value={goalDue}
            onChange={onDueChange}
          />
        </label>
        <Tip>
          You'll need to save{' '}
          {goalPayment.toLocaleString('en', { style: 'currency', currency: 'usd' })} per month to
          make this goal. Don't worry, you got this!
        </Tip>
        <ActionButton onclick={onSubmit}>Sign up</ActionButton>
      </form>
    </main>
  );
};

export default RegisterGoal;
