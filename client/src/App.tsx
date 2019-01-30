import * as React from 'react';
import { Router } from '@reach/router';
import data from './data';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Budget from './components/Budget/Budget';
import { User, Category, FixedExpense } from './types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleRight, faAngleDown);

type State = {
  user?: User;
  fixedExpenses?: FixedExpense[];
  categories?: Category[];
};

class App extends React.Component<{}, State> {
  state: State = {
    fixedExpenses: [],
    categories: []
  };

  componentDidMount() {
    const { user, fixedExpenses, categories } = data;
    this.setState({ user, fixedExpenses, categories });
  }

  render() {
    const { user, fixedExpenses, categories } = this.state;
    return (
      <Router>
        <Dashboard path="/" user={user!} categories={categories!} />
        <Budget
          path="/budget"
          user={user!}
          categories={categories!}
          fixedExpenses={fixedExpenses!}
        />
      </Router>
    );
  }
}

export default App;
