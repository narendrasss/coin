import * as React from 'react';
import { RouteComponentProps, Link, navigate } from '@reach/router';
import style from './Login.module.scss';
import { SubmitButton } from '../../buttons';
import { FetchError } from '../../errors';
import coin from '../../../client';
import MainContainer from '../MainContainer/MainContainer';
import { CoinError } from '../../../types';
import { TextInput } from '../../form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const client = coin();

type State = {
  email: string;
  password: string;
  loading: boolean;
  error?: CoinError;
};

class Login extends React.Component<RouteComponentProps, State> {
  state: State = {
    email: '',
    password: '',
    loading: false
  };

  public render() {
    const { email, password, loading, error } = this.state;
    return (
      <MainContainer>
        <header className={style.header}>
          <h1>Hey there!</h1>
          <p className={style.subtitle}>Thanks for checking in.</p>
        </header>
        <form className={style.form} onSubmit={this._handleSubmit}>
          <TextInput
            label="Email"
            name="email"
            value={email}
            onChange={this._handleEmailChange}
            type="email"
            opts={{ required: true }}
          />
          <TextInput
            label="Password"
            name="password"
            value={password}
            onChange={this._handlePasswordChange}
            type="password"
            opts={{ required: true }}
          />
          {error ? <FetchError code={error.code} /> : null}
          <SubmitButton>{loading ? <FontAwesomeIcon icon="spinner" /> : 'Login'}</SubmitButton>
        </form>
        <footer className={style.registerLink}>
          <Link to="/register">Don't have an account with us?</Link>
        </footer>
      </MainContainer>
    );
  }

  private _handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ email: e.target.value });
  };

  private _handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ password: e.target.value });
  };

  private _handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    await this.setState({ loading: true });
    const { email, password } = this.state;
    client
      .login(email, password)
      .then(res => {
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token!);
        this.setState({ loading: false }, () => navigate('/home'));
      })
      .catch(err => this.setState({ loading: false, error: err.error }));
  };
}

export default Login;
