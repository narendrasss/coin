import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../Register.module.scss';
import { SubmitButton, LinkButton } from '../../../buttons';
import Axios from '../../../../utils/api';
import { Error } from '../../../errors';
import { AxiosError } from 'axios';

type IError = {
  message?: string;
};

type Props = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  handleTextChange: React.ChangeEventHandler<HTMLInputElement>;
};

type State = {
  loading: boolean;
  success: boolean;
  errors?: IError | AxiosError;
};

class RegisterInfo extends React.Component<Props & RouteComponentProps, State> {
  state = {
    loading: false,
    success: false
  } as State;

  validate = (): [boolean, IError?] => {
    const { password, passwordConfirm } = this.props;
    if (password !== passwordConfirm) {
      return [false, { message: 'Passwords must match' }];
    }
    return [true];
  };

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const [isValid, errors] = this.validate();
    if (!isValid) return this.setState({ errors });

    const { name, email, password } = this.props;
    try {
      await this.setState({ loading: true });

      const response = await Axios.post('/register', { name, email, password });
      const token = response.data;
      localStorage.setItem('token', token);

      this.setState({ loading: false, success: true, errors: {} });
      navigate('register/income');
    } catch (e) {
      console.error(e);
      this.setState({ loading: false, errors: { message: 'Looks like that email was taken.' } });
    }
  };

  render() {
    const { name, email, password, passwordConfirm, handleTextChange } = this.props;
    const { loading, success, errors } = this.state;
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
              onChange={handleTextChange}
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
              onChange={handleTextChange}
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
              onChange={handleTextChange}
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
              onChange={handleTextChange}
              style={{ marginBottom: '2rem' }}
              required
            />
          </label>
          {errors && errors.message ? <Error>{errors.message}</Error> : null}
          {success ? (
            <LinkButton to="./income" icon="arrow-right" />
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
