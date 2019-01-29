import * as React from 'react';
import { Router } from '@reach/router';
import data from './data';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

class App extends React.Component {
  state = {
    name: '',
    income: 0,
    funds: 0,
    goal: 0,
    fixedExpenses: [],
    categories: []
  };

  componentDidMount() {
    const { name, income, funds, goal, fixedExpenses, categories } = data;
    this.setState({ name, income, funds, goal, fixedExpenses, categories });
  }

  render() {
    const { funds, goal, categories } = this.state;
    return (
      <Router>
        <Dashboard path="/" funds={funds} goal={goal} categories={categories} />
      </Router>
    );
  }
}

export default App;
