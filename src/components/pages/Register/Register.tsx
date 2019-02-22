import * as React from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import Axios from '../../../utils/api';
import { AxiosError } from 'axios';
import { FixedExpense, Category, Goal } from '../../../types';
import RegisterInfo from './RegisterInfo/RegisterInfo';
import RegisterIncome from './RegisterIncome/RegisterIncome';
import RegisterCategory from './RegisterCategory/RegisterCategory';
import RegisterGoal from './RegisterGoal/RegisterGoal';
import moment from 'moment';

type State = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  income: number;
  budget: number;
  fixedExpenses: FixedExpense[];
  categories: Category[];
  goalFor: string;
  goalAmount: number;
  goalDue: string;
  goalPayment: number;
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
    categories: [{ name: '', amount: 0 }],
    goalFor: '',
    goalAmount: 0,
    goalDue: '',
    goalPayment: 0
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

  handleDelFixedExpense = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    const fixedExpenses = this.state.fixedExpenses;
    const idx = fixedExpenses.findIndex(fe => fe.name === name);
    fixedExpenses.splice(idx, 1);
    this.setState({ fixedExpenses });
  };

  handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const categories = this.state.categories;
    const expense = categories[idx];
    if (e.target.type === 'text') {
      expense.name = e.target.value;
    } else {
      expense.amount = +e.target.value;
    }
    this.setState({ categories });
  };

  handleAddCategory = (e: React.MouseEvent, name: string = '', amount: number = 0) => {
    e.preventDefault();

    const categories = this.state.categories;
    if (categories[0].name === '') categories.pop();

    categories.push({ name, amount });
    this.setState({ categories });
  };

  handleDelCategory = (e: React.MouseEvent, name: string) => {
    e.preventDefault();

    const categories = this.state.categories;
    const idx = categories.findIndex(ctg => ctg.name === name);
    categories.splice(idx, 1);

    if (!categories.length) categories.push({ name: '', amount: 0 });

    this.setState({ categories });
  };

  handleGoalAmountChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ goalAmount: +e.target.value }, () => {
      const { goalAmount, goalDue, goalPayment } = this.state;
      if (goalDue.length) {
        const months = moment(goalDue).diff(moment(), 'month');
        this.setState({ goalPayment: goalAmount / months });
      }
    });
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
    const {
      name,
      email,
      password,
      passwordConfirm,
      income,
      fixedExpenses,
      categories,
      goalFor,
      goalAmount,
      goalDue,
      goalPayment
    } = this.state;
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
        <RegisterCategory
          path="categories"
          categories={categories}
          onChange={this.handleCategoryChange}
          onAdd={this.handleAddCategory}
          onDel={this.handleDelCategory}
        />
        <RegisterGoal
          path="goal"
          goalFor={goalFor}
          goalAmount={goalAmount}
          goalDue={goalDue}
          goalPayment={goalPayment}
          onTextChange={this.handleTextChange}
          onNumChange={this.handleGoalAmountChange}
          onSubmit={this.handleSubmit}
        />
      </Router>
    );
  }
}

export default Register;
