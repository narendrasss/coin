import * as React from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import Axios from '../../api';
import { AxiosError } from 'axios';
import RegisterInfo from './RegisterInfo/RegisterInfo';
import RegisterIncome from './RegisterIncome/RegisterIncome';

type State = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  income: string;
  error?: AxiosError;
};

class Register extends React.Component<RouteComponentProps, Partial<State>> {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    income: ''
  } as State;

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
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
    const { name, email, password, passwordConfirm, income } = this.state;
    return (
      <Router>
        <RegisterInfo
          path="/"
          name={name}
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          handleTextChange={this.handleTextChange}
        />
        <RegisterIncome path="income" income={income} handleTextChange={this.handleTextChange} />
      </Router>
    );
  }
}

export default Register;
