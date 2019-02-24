import * as React from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { FixedExpense, Category, Goal } from '../../../types';
import RegisterInfo from './RegisterInfo/RegisterInfo';
import RegisterIncome from './RegisterIncome/RegisterIncome';
import RegisterCategory from './RegisterCategory/RegisterCategory';
import RegisterGoal from './RegisterGoal/RegisterGoal';
import moment from 'moment';

type InfoState = {
  [key: string]: string | boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  success: boolean;
};

type IncomeState = {
  [key: string]: number;
  income: number;
  budget: number;
};

type GoalState = {
  [key: string]: string | number;
  goal: string;
  amount: number;
  due: string;
  payment: number;
};

type RegisterState = {
  info: InfoState;
  income: IncomeState;
  fixedExpenses: FixedExpense[];
  categories: Category[];
  goal: GoalState;
};

class Register extends React.Component<RouteComponentProps, Partial<RegisterState>> {
  state = {
    info: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      success: false
    },
    income: {
      income: 0,
      budget: 0
    },
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
    goal: {
      goal: '',
      amount: 0,
      due: '',
      payment: 0
    }
  } as RegisterState;

  /* Event handlers */

  handleTextChange = (
    group: 'info' | 'income' | 'goal'
  ): React.ChangeEventHandler<HTMLInputElement> => e => {
    const page = this.state[group];
    page[e.target.id] = e.target.value;
    this.setState({ [group]: page });
  };

  handleArrayChange = (group: 'fixedExpenses' | 'categories') => (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const arr = this.state[group];
    const el = arr[idx];
    if (e.target.type === 'text') {
      el.name = e.target.value;
    } else {
      el.amount = +e.target.value;
    }
    this.setState({ [group]: arr });
  };

  handleArrayAdd = (group: 'fixedExpenses' | 'categories') => (
    e: React.MouseEvent,
    name: string = '',
    amount: number = 0
  ) => {
    e.preventDefault();

    const arr = this.state[group];
    if (arr[0].name === '') arr.pop();

    arr.push({ name, amount });
    this.setState({ [group]: arr });
  };

  handleArrayDelete = (group: 'fixedExpenses' | 'categories') => (
    e: React.MouseEvent,
    name: string
  ) => {
    e.preventDefault();

    const arr = this.state[group];
    const idx = arr.findIndex((el: FixedExpense | Category) => el.name === name);
    arr.splice(idx, 1);

    if (!arr.length) arr.push({ name: '', amount: 0 });
    this.setState({ [group]: arr });
  };

  toggleSuccess = (group: 'info' | 'income' | 'goal') => () => {
    const page = this.state[group];
    page.success = !page.success;
    this.setState({ [group]: page });
  };

  handleGoalAmountChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { goal } = this.state;
    goal.amount = +e.target.value;
    this.setState({ goal }, this.calculateGoalPayment);
  };

  handleGoalDueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { goal } = this.state;
    goal.due = e.target.value;
    this.setState({ goal }, this.calculateGoalPayment);
  };

  handleSubmit = () => {};

  /* Helpers */

  calculateGoalPayment = () => {
    const { goal } = this.state;
    if (goal.due.length) {
      const months = moment(goal.due).diff(moment(), 'month');
      this.setState({ [goal.payment]: goal.amount / months });
    }
  };

  render() {
    const { info, income, fixedExpenses, categories, goal } = this.state;
    return (
      <Router>
        <RegisterInfo
          path="/"
          handleTextChange={this.handleTextChange('info')}
          toggleSuccess={this.toggleSuccess('info')}
          {...info}
        />
        <RegisterIncome
          path="income"
          fixedExpenses={fixedExpenses}
          handleTextChange={this.handleTextChange('income')}
          handleFixedExpenseChange={this.handleArrayChange('fixedExpenses')}
          handleFixedExpenseAdd={this.handleArrayAdd('fixedExpenses')}
          handleFixedExpenseDelete={this.handleArrayDelete('fixedExpenses')}
          {...income}
        />
        <RegisterCategory
          path="categories"
          categories={categories}
          handleCategoryChange={this.handleArrayChange('categories')}
          handleCategoryAdd={this.handleArrayAdd('categories')}
          handleCategoryDelete={this.handleArrayDelete('categories')}
        />
        <RegisterGoal
          path="goal"
          handleGoalChange={this.handleTextChange('goal')}
          handleDueChange={this.handleGoalDueChange}
          handleAmountChange={this.handleGoalAmountChange}
          handleSubmit={this.handleSubmit}
          {...goal}
        />
      </Router>
    );
  }
}

export default Register;
