import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './Register.module.scss';
import { BackButton, SubmitButton } from '../../buttons';
import { Tip } from '../../general';
import { TextInput } from '../../form';
import { CoinError } from '../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Error } from '../../errors';
import MainContainer from '../MainContainer/MainContainer';

interface RegisterGoalProps extends RouteComponentProps {
  goal: string;
  amount: number;
  due: string;
  payment: number;
  handleGoalChange: React.ChangeEventHandler<HTMLInputElement>;
  handleDueChange: React.ChangeEventHandler<HTMLInputElement>;
  handleAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: React.FormEventHandler;
  loading: boolean;
  errors?: CoinError;
}

const RegisterGoal: React.FC<RegisterGoalProps> = ({
  goal,
  amount,
  due,
  payment,
  handleGoalChange,
  handleDueChange,
  handleAmountChange,
  handleSubmit,
  loading,
  errors
}) => {
  return (
    <MainContainer>
      <BackButton to="categories" />
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 4 of 4 &mdash; Goal</p>
        <p className={style.text}>Last one - we promise!</p>
      </header>
      <form className={style.form} onSubmit={handleSubmit}>
        <TextInput
          label="What do you want to save for?"
          name="goal"
          value={goal}
          onChange={handleGoalChange}
        />
        <TextInput
          label="How much do you need?"
          name="amount"
          value={amount ? amount : ''}
          onChange={handleAmountChange}
          type="number"
        />
        <TextInput
          label="When do you need it by?"
          name="due"
          value={due}
          onChange={handleDueChange}
          type="date"
        />
        <Tip>
          You'll need to save {payment.toLocaleString('en', { style: 'currency', currency: 'usd' })}{' '}
          per month to make this goal. Don't worry, you got this!
        </Tip>
        {errors && errors.message ? <Error>{errors.message}</Error> : null}
        <SubmitButton>{loading ? <FontAwesomeIcon icon="spinner" /> : 'Sign Up'}</SubmitButton>
      </form>
    </MainContainer>
  );
};

export default RegisterGoal;
