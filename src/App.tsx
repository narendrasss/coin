import React, { Component } from 'react';
import { Router } from '@reach/router';
import { IUser, ICategory, IFixedExpense } from './types';
import {
  Budget,
  FixedExpenseForm,
  Login,
  Register,
  Dashboard,
  RedirectContainer,
  Categories,
  Category
} from './components/pages';
import { initIcons } from './utils/icons';

initIcons();

type State = {
  user?: IUser;
  fixedExpenses?: IFixedExpense[];
  categories?: ICategory[];
  fixedExpense: string;
  fixedExpenseAmount: string;
  fixedExpenseDue: string;
};

class App extends Component<{}, State> {
  render() {
    return (
      <Router>
        <RedirectContainer path="/" />
        <Login path="/login" />
        <Register path="/register/*" />
        <Dashboard path="/home" />
        <Budget path="/budget" />
        <Categories path="/categories" />
        <Category path="/categories/:id" />
      </Router>
    );
  }
}

export default App;
