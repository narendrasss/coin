import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import LinkButton from '../../LinkButton/LinkButton';

type Props = {
  income: string;
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
};

const RegisterIncome: React.FC<Props & RouteComponentProps> = props => {
  const { income, handleTextChange } = props;
  return (
    <main className={style.container}>
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
        <LinkButton
          to="./income"
          icon="arrow-right"
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </form>
    </main>
  );
};

export default RegisterIncome;
