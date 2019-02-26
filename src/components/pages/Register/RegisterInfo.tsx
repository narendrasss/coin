import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Register.module.scss';
import { SubmitButton, LinkButton } from '../../buttons';
import { Error } from '../../errors';
import coin from '../../../client';
import { CoinError } from '../../../client/types';
import { TextInput } from '../../form';

const client = coin();

interface RegisterInfoProps extends RouteComponentProps {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
  toggleSuccess: () => void;
  success: boolean;
}

type State = {
  loading: boolean;
  errors?: CoinError;
};

class RegisterInfo extends React.Component<RegisterInfoProps, State> {
  state: State = {
    loading: false,
    errors: {} as CoinError
  };

  public render() {
    const { name, email, password, passwordConfirm, success } = this.props;
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
        <form className={style.form} onSubmit={this._handleSubmit}>
          <TextInput
            label="Full name"
            value={name}
            name="name"
            onChange={this._handleTextChange}
            opts={{ required: true }}
          />
          <TextInput
            label="Email"
            value={email}
            name="email"
            onChange={this._handleEmailChange}
            type="email"
            opts={{ required: true }}
          />
          <TextInput
            label="Password"
            value={password}
            name="password"
            onChange={this._handleTextChange}
            type="password"
            opts={{ required: true }}
          />
          <TextInput
            label="Confirm password"
            value={passwordConfirm}
            name="passwordConfirm"
            onChange={this._handleTextChange}
            type="password"
            opts={{ required: true }}
          />
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

  private _validatePassword = (): [boolean, CoinError?] => {
    const { password, passwordConfirm } = this.props;
    if (password !== passwordConfirm) {
      return [false, { code: 0, message: 'Passwords must match' }];
    }
    return [true];
  };

  private _handleTextChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ errors: {} as CoinError });
    this.props.handleTextChange(e);
  };

  private _handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (this.props.success) this.props.toggleSuccess();
    this._handleTextChange(e);
  };

  private _handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const [isValid, errors] = this._validatePassword();
    if (!isValid) return this.setState({ errors });

    await this.setState({ loading: true });

    const { email, toggleSuccess } = this.props;
    client
      .register({ email })
      .then(() => {
        toggleSuccess();
        this.setState({ loading: false }, () => navigate('/register/income'));
      })
      .catch(err => this.setState({ loading: false, errors: err.error }));
  };
}

export default RegisterInfo;
