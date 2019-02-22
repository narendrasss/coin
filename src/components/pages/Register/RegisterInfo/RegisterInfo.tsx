import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import { LinkButton } from '../../../buttons';

type Props = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
};

const RegisterInfo: React.FC<Props & RouteComponentProps> = props => {
  const { name, email, password, passwordConfirm, handleTextChange } = props;
  return (
    <main className={style.container}>
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 1 of 4 &mdash; Personal Information</p>
        <p className={style.text}>
          To ensure that you have the best experience with us, we have a few questions we'd like to
          ask.
        </p>
      </header>
      <form>
        <label htmlFor="name">
          Full Name
          <input
            className={style.inputActive}
            id="name"
            value={name}
            type="text"
            onChange={handleTextChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className={style.inputActive}
            id="email"
            value={email}
            type="email"
            onChange={handleTextChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className={style.inputActive}
            id="password"
            value={password}
            type="password"
            onChange={handleTextChange}
          />
        </label>
        <label htmlFor="passwordConfirm">
          Password Confirmation
          <input
            className={style.inputActive}
            id="passwordConfirm"
            value={passwordConfirm}
            type="password"
            onChange={handleTextChange}
            style={{ marginBottom: '2rem' }}
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

export default RegisterInfo;
