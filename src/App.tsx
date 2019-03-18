import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
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
import AddNewExpense from './components/pages/AddNewExpense/AddNewExpense';

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
        <AddNewExpense path="/new-expense" />
      </Router>
    );
  }
}

export default App;
