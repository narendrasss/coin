import * as React from 'react';
import { Router, navigate } from '@reach/router';
import data from './data';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Budget from './components/Budget/Budget';
import { User, Category, FixedExpense } from './types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FixedExpenseForm from './components/FixedExpenseForm/FixedExpenseForm';
import Categories from './components/Categories/Categories';
import CategoryForm from './components/CategoryForm/CategoryForm';
import CategoryPage from './components/Category/Category';

library.add(faAngleRight, faAngleDown, faArrowLeft);

type State = {
  user?: User;
  fixedExpenses?: FixedExpense[];
  categories?: Category[];
  fixedExpense: string;
  fixedExpenseAmount: string;
  fixedExpenseDue: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    user: {
      _id: 0,
      name: '',
      income: 0,
      goal: {
        funds: 0,
        goal: 0,
        payment: 0,
        due: new Date()
      }
    },
    fixedExpenses: [],
    categories: [],
    fixedExpense: 'Car loan',
    fixedExpenseAmount: '250',
    fixedExpenseDue: ''
  };

  componentDidMount() {
    const { user, fixedExpenses, categories } = data;
    this.setState({ user, fixedExpenses, categories });
  }

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

  getCategory(name: string) {
    const { categories } = this.state;
    if (categories) {
      const results = categories.filter(ctg => ctg.name === name);
      if (results.length) return results[0];
    }
  }

  render() {
    const { user, fixedExpenses, categories, fixedExpense, fixedExpenseAmount } = this.state;
    return (
      <Router>
        <Dashboard path="/" user={user!} categories={categories!} />
        <Budget
          path="/budget"
          user={user!}
          categories={categories!}
          fixedExpenses={fixedExpenses!}
        />
        <FixedExpenseForm
          path="/budget/add-monthly-expense"
          name={fixedExpense}
          amount={fixedExpenseAmount}
          onNameChange={this.handleExpenseNameChange}
          onAmountChange={this.handleExpenseAmountChange}
          onDueChange={this.handleExpenseDueChange}
          onSubmit={this.handleExpenseSubmit}
        />
        <Categories
          path="/categories"
          income={user!.income}
          fixedExpenses={fixedExpenses!}
          categories={categories!}
        />
        <CategoryForm path="/add-category" />
        <CategoryPage path="/categories/:categoryName" onMount={this.getCategory} />
      </Router>
    );
  }
}

export default App;
