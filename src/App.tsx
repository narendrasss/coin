import * as React from 'react';
import { Router, navigate } from '@reach/router';
import { IUser, ICategory, IFixedExpense } from './types';
import {
  Budget,
  FixedExpenseForm,
  Login,
  Register,
  Dashboard,
  RedirectContainer
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

class App extends React.Component<{}, State> {
  handleExpenseNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ fixedExpense: e.target.value });
  };

  handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ fixedExpenseAmount: e.target.value });
  };

  handleExpenseDueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ fixedExpenseDue: e.target.value });
  };

  handleExpenseSubmit = () => {
    const { fixedExpense, fixedExpenseAmount, fixedExpenseDue } = this.state;
    const newExpense = {
      name: fixedExpense,
      amount: +fixedExpenseAmount,
      due: new Date(fixedExpenseDue)
    };
    this.setState(
      prevState => {
        fixedExpenses: prevState.fixedExpenses
          ? prevState.fixedExpenses.push(newExpense)
          : [newExpense];
      },
      () => navigate('/budget')
    );
  };

  render() {
    return (
      <Router>
        <RedirectContainer path="/" />
        <Login path="/login" />
        <Register path="/register/*" />
        <Dashboard path="/home" />
      </Router>
    );
  }
}

export default App;
