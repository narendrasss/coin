import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  state = {
    funds: 500,
    goal: 1500,
    budget: {
      total: 1000,
      categories: [
        {
          name: 'Food',
          amount: 600,
          spent: 200
        },
        {
          name: 'Shopping',
          amount: 400,
          spent: 50
        }
      ]
    }
  };

  render() {
    const { funds, goal, budget } = this.state;
    return <Dashboard funds={funds} goal={goal} budget={budget} />;
  }
}

export default App;
