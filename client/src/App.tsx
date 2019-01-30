import * as React from 'react';
import { Router } from '@reach/router';
import data from './data';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Budget from './components/Budget/Budget';
import { Category, Transaction } from './types';

type State = {
  name: string;
  income: number;
  funds: number;
  goal: number;
  goalPayment: number;
  goalDue: Date;
  fixedExpenses: Transaction[];
  categories: Category[];
};

class App extends React.Component {
  state = {
    name: '',
    income: 0,
    funds: 0,
    goal: 0,
    goalPayment: 0,
    goalDue: null,
    fixedExpenses: [],
    categories: []
  };

  componentDidMount() {
    const { name, income, funds, goal, goalPayment, goalDue, fixedExpenses, categories } = data;
    this.setState({ name, income, funds, goal, goalPayment, goalDue, fixedExpenses, categories });
  }

  render() {
    const { income, funds, goal, goalPayment, fixedExpenses, categories } = this.state;
    return (
      <Router>
        <Dashboard path="/" funds={funds} goal={goal} categories={categories} />
        <Budget
          path="budget"
          income={income}
          funds={funds}
          goal={goal}
          goalPayment={goalPayment}
          categories={categories}
          fixedExpenses={fixedExpenses}
        />
      </Router>
    );
  }
}

export default App;
