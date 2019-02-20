import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import style from './Login.module.scss';
import ActionButton from '../ActionButton/ActionButton';
import Axios from '../../api';
import { AxiosError } from 'axios';
import Error from '../Error/Error';

type State = {
  email: string;
  password: string;
  error?: AxiosError;
};

class Login extends React.Component<RouteComponentProps, State> {
  state = {
    email: '',
    password: ''
  } as State;

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async () => {
    const { email, password } = this.state;
    try {
      const response = await Axios.post('/login', { email, password });
      const token = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      this.setState({ error });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <main className={style.container}>
        <header className={style.header}>
          <h1>Hey there!</h1>
          <p className={style.subtitle}>Thanks for checking in.</p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            Email
            <input
              className={email.length ? style.inputActive : style.input}
              id="email"
              value={email}
              type="text"
              onChange={this.handleEmailChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className={password.length ? style.inputActive : style.input}
              id="password"
              value={password}
              type="password"
              onChange={this.handlePasswordChange}
              style={{ marginBottom: '2rem' }}
            />
          </label>
          {error ? <Error code={error.response!.status} /> : null}
          <ActionButton onclick={this.handleSubmit}>Login</ActionButton>
        </form>
        <Link className={style.registerLink} to="/register">
          Don't have an account with us?
        </Link>
      </main>
    );
  }
}

export default Login;
