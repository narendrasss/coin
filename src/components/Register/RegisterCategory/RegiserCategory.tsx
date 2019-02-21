import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import LinkButton from '../../LinkButton/LinkButton';
import BackButton from '../../BackButton/BackButton';

type Props = {};

const RegisterCategory: React.FC<Props & RouteComponentProps> = props => {
  return (
    <main className={style.container}>
      <BackButton to="/register/income" />
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 3 of 4 &mdash; Categories</p>
        <p className={style.text}>Last one - we promise!</p>
      </header>
      <form />
    </main>
  );
};

export default RegisterCategory;
