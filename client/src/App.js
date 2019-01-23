import React, { Component } from 'react';
import { Router } from '@reach/router';
import data from './data';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  state = {
    funds: 0,
    goal: 0,
    budget: {
      total: 0,
      categories: []
    }
  };

  componentDidMount() {
    const { funds, goal, budget } = data;
    this.setState({ funds, goal, budget });
  }

  render() {
    const { funds, goal, budget } = this.state;
    return (
      <Router>
        <Dashboard path="/" funds={funds} goal={goal} budget={budget} />
      </Router>
    );
  }
}

export default App;
