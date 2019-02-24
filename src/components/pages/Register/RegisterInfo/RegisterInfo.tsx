import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../Register.module.scss';
import { SubmitButton, LinkButton } from '../../../buttons';
import { Error } from '../../../errors';
import coin from '../../../../client';
import { CoinError } from '../../../../client/types';

const client = coin();

type Props = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  toggleSuccess: () => void;
  success: boolean;
};

type State = {
  loading: boolean;
  errors?: CoinError;
};

class RegisterInfo extends React.Component<Props & RouteComponentProps, State> {
  state = {
    loading: false,
    errors: {}
  } as State;

  validate = (): [boolean, CoinError?] => {
    const { password, passwordConfirm } = this.props;
    if (password !== passwordConfirm) {
      return [false, { code: 0, message: 'Passwords must match' }];
    }
    return [true];
  };

  handleTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ errors: {} as CoinError });
    this.props.handleTextChange(e);
  };

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const [isValid, errors] = this.validate();
    if (!isValid) return this.setState({ errors });

    await this.setState({ loading: true });

    const { name, email, password, toggleSuccess } = this.props;
    client
      .register({ name, email, password })
      .then(res => {
        localStorage.setItem('token', res.token!);
        toggleSuccess();
        this.setState({ loading: false }, () => navigate('/register/income'));
      })
      .catch(err => this.setState({ loading: false, errors: err.error }));
  };

  render() {
    const { name, email, password, passwordConfirm, success, handleTextChange } = this.props;
    const { loading, errors } = this.state;
    return (
      <main className={style.container}>
        <header className={style.header}>
          <h1>Create an Account</h1>
          <p className={style.subtitle}>Step 1 of 4 &mdash; Personal Information</p>
          <p className={style.text}>
            To ensure that you have the best experience with us, we have a few questions we'd like
            to ask.
          </p>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Full Name
            <input
              className={style.inputActive}
              id="name"
              value={name}
              type="text"
              onChange={this.handleTextChange}
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              className={style.inputActive}
              id="email"
              value={email}
              type="email"
              onChange={this.handleTextChange}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className={style.inputActive}
              id="password"
              value={password}
              type="password"
              onChange={this.handleTextChange}
              required
            />
          </label>
          <label htmlFor="passwordConfirm">
            Password Confirmation
            <input
              className={style.inputActive}
              id="passwordConfirm"
              value={passwordConfirm}
              type="password"
              onChange={this.handleTextChange}
              style={{ marginBottom: '2rem' }}
              required
            />
          </label>
          {errors && errors.message ? <Error>{errors.message}</Error> : null}
          {success ? (
            <LinkButton
              style={{ display: 'flex', justifyContent: 'center' }}
              to="./income"
              icon="arrow-right"
            />
          ) : (
            <SubmitButton>
              <FontAwesomeIcon icon={loading ? 'spinner' : 'arrow-right'} />
            </SubmitButton>
          )}
        </form>
      </main>
    );
  }
}

export default RegisterInfo;
