import * as React from 'react';
import { RouteComponentProps, Router, navigate } from '@reach/router';
import { IFixedExpense, ICategory } from '../../../types';
import RegisterInfo from './RegisterInfo';
import RegisterIncome from './RegisterIncome';
import RegisterCategory from './RegisterCategory/RegisterCategory';
import RegisterGoal from './RegisterGoal';
import moment from 'moment';
import coin from '../../../client';
import { CoinError } from '../../../types';

const client = coin();

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
  fixedExpenses: IFixedExpense[];
  categories: ICategory[];
  goal: GoalState;
  loading: boolean;
  errors?: CoinError;
};

class Register extends React.Component<RouteComponentProps, Partial<RegisterState>> {
  state: RegisterState = {
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
    categories: [{ name: '', budget: 0 }],
    goal: {
      goal: '',
      amount: 0,
      due: '',
      payment: 0
    },
    loading: false
  };

  public render() {
    const { info, income, fixedExpenses, categories, goal, loading, errors } = this.state;
    return (
      <Router>
        <RegisterInfo
          path="/"
          handleTextChange={this._handleTextChange('info')}
          toggleSuccess={this._toggleSuccess('info')}
          {...info}
        />
        <RegisterIncome
          path="income"
          fixedExpenses={fixedExpenses}
          handleTextChange={this._handleTextChange('income')}
          handleFixedExpenseChange={this._handleFixedExpenseChange}
          handleFixedExpenseAdd={this._handleFixedExpenseAdd}
          handleFixedExpenseDelete={this._handleFixedExpenseDelete}
          {...income}
        />
        <RegisterCategory
          path="categories"
          categories={categories}
          handleCategoryChange={this._handleCategoryChange}
          handleCategoryAdd={this._handleCategoryAdd}
          handleCategoryDelete={this._handleCategoryDelete}
        />
        <RegisterGoal
          path="goal"
          handleGoalChange={this._handleTextChange('goal')}
          handleDueChange={this._handleGoalDueChange}
          handleAmountChange={this._handleGoalAmountChange}
          handleSubmit={this._handleSubmit}
          loading={loading}
          errors={errors}
          {...goal}
        />
      </Router>
    );
  }

  /* Event handlers */

  private _handleTextChange = (
    group: 'info' | 'income' | 'goal'
  ): React.ChangeEventHandler<HTMLInputElement> => e => {
    const page = this.state[group];
    page[e.target.name] = e.target.value;
    this.setState({ [group]: page });
  };

  /* Fixed expense handlers */

  private _handleFixedExpenseChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { fixedExpenses } = this.state;
    const ctg = fixedExpenses[idx];
    if (e.target.type === 'text') {
      ctg.name = e.target.value;
    } else {
      ctg.amount = +e.target.value;
    }
    this.setState({ fixedExpenses });
  };

  private _handleFixedExpenseAdd = (e: React.MouseEvent, name: string = '', amount: number = 0) => {
    e.preventDefault();

    const { fixedExpenses } = this.state;
    fixedExpenses.push({ name, amount });
    this.setState({ fixedExpenses });
  };

  private _handleFixedExpenseDelete = (e: React.MouseEvent, name: string) => {
    e.preventDefault();

    const { fixedExpenses } = this.state;
    const idx = fixedExpenses.findIndex(ctg => ctg.name === name);
    fixedExpenses.splice(idx, 1);

    if (!fixedExpenses.length) fixedExpenses.push({ name: '', amount: 0 });
    this.setState({ fixedExpenses });
  };

  /* Category handlers */

  private _handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { categories } = this.state;
    const ctg = categories[idx];
    if (e.target.type === 'text') {
      ctg.name = e.target.value;
    } else {
      ctg.budget = +e.target.value;
    }
    this.setState({ categories });
  };

  private _handleCategoryAdd = (e: React.MouseEvent, name?: string, amount?: number) => {
    e.preventDefault();
    const { categories } = this.state;
    const def = { name: '', amount: 0 };

    const empty = categories.find(ctg => ctg.name === '');
    if (empty) {
      empty.name = name ? name : def.name;
      empty.budget = amount ? amount : def.amount;
    } else {
      categories.push({
        name: name ? name : def.name,
        budget: amount ? amount : def.amount
      });
    }

    this.setState({ categories });
  };

  private _handleCategoryDelete = (e: React.MouseEvent, name: string) => {
    e.preventDefault();

    const { categories } = this.state;
    const idx = categories.findIndex(ctg => ctg.name === name);
    categories.splice(idx, 1);

    if (!categories.length) categories.push({ name: '', budget: 0 });
    this.setState({ categories });
  };

  /* Goal handlers */

  private _handleGoalAmountChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { goal } = this.state;
    goal.amount = +e.target.value;
    this.setState({ goal }, this._calculateGoalPayment);
  };

  private _handleGoalDueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { goal } = this.state;
    goal.due = e.target.value;
    this.setState({ goal }, this._calculateGoalPayment);
  };

  private _handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    await this.setState({ loading: true });
    const { info, income, goal } = this.state;
    try {
      const res = await client.register({ ...info, ...income, goal });
      localStorage.setItem('token', res.token!);

      const { fixedExpenses } = this.state;
      const fePromises = fixedExpenses.map(async tr => {
        await client.fixedExpenses.create(tr);
      });

      const { categories } = this.state;
      const ctgPromises = categories.map(async ctg => {
        await client.category.create(ctg);
      });

      await Promise.all([...fePromises, ...ctgPromises]);
      this.setState({ loading: false }, () => navigate('/home'));
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  };

  /* Helpers */

  private _toggleSuccess = (group: 'info' | 'income' | 'goal') => () => {
    const page = this.state[group];
    page.success = !page.success;
    this.setState({ [group]: page });
  };

  private _calculateGoalPayment = () => {
    const { goal } = this.state;
    if (goal.due.length) {
      const months = moment(goal.due).diff(moment(), 'month');
      this.setState({ [goal.payment]: goal.amount / months });
    }
  };
}

export default Register;
