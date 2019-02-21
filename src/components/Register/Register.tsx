import * as React from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import Axios from '../../api';
import { AxiosError } from 'axios';
import RegisterInfo from './RegisterInfo/RegisterInfo';
import RegisterIncome from './RegisterIncome/RegisterIncome';
import { FixedExpense, Category } from '../../types';
import RegisterCategory from './RegisterCategory/RegiserCategory';

type State = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  income: number;
  budget: number;
  fixedExpenses: FixedExpense[];
  categories: Category[];
  error?: AxiosError;
};

class Register extends React.Component<RouteComponentProps, Partial<State>> {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    income: 0,
    budget: 0,
    fixedExpenses: [
      {
        name: 'Rent',
        amount: 800
      },
      {
        name: 'Membership',
        amount: 50
      },
      {
        name: 'Utilities',
        amount: 100
      }
    ],
    categories: []
  } as State;

  handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleFixedExpenseChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const fixedExpenses = this.state.fixedExpenses;
    const expense = fixedExpenses[idx];
    if (e.target.type === 'text') {
      expense.name = e.target.value;
    } else {
      expense.amount = +e.target.value;
    }
    this.setState({ fixedExpenses });
  };

  handleAddFixedExpense: React.MouseEventHandler = e => {
    e.preventDefault();
    const fixedExpenses = this.state.fixedExpenses;
    fixedExpenses.push({ name: '', amount: 0 });
    this.setState({ fixedExpenses });
  };

  handleDelFixedExpense = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    const fixedExpenses = this.state.fixedExpenses;
    fixedExpenses.splice(idx, 1);
    this.setState({ fixedExpenses });
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
    const { name, email, password, passwordConfirm, income, fixedExpenses } = this.state;
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
        <RegisterIncome
          path="income"
          income={income}
          fixedExpenses={fixedExpenses}
          handleTextChange={this.handleTextChange}
          handleFixedExpenseChange={this.handleFixedExpenseChange}
          handleAddFixedExpense={this.handleAddFixedExpense}
          handleDelFixedExpense={this.handleDelFixedExpense}
        />
        <RegisterCategory path="categories" />
      </Router>
    );
  }
}

export default Register;
