import React, { Component } from 'react';
import './Dashboard.scss';

class Dashboard extends Component {
  state = {
    funds: 0,
    goal: 0,
    budgetTotal: 0,
    expenseTotal: 0,
    categories: []
  };

  static getDerivedStateFromProps({ funds, goal, budget }) {
    const { total, categories } = budget;
    const budgetTotal = total;
    const expenseTotal = categories.reduce((acc, curr) => acc + curr.spent, 0);

    return { funds, goal, budgetTotal, categories, expenseTotal };
  }

  render() {
    const { funds, goal, budgetTotal, categories, expenseTotal } = this.state;
    return (
      <div className="Dashboard">
        <header className="Dashboard__goal">
          <h1>${goal - funds}</h1>
          <p>Left until you reach your goal!</p>
        </header>
        <div className="Dashboard__info">
          <p className="opaque">{new Date().toDateString()}</p>
          <p>{budgetTotal - expenseTotal} remaining in budget.</p>
          <div className="Dashboard__graph" />
          {categories.map(ctg => {
            const { name, amount, spent } = ctg;
            return (
              <div className="Dashboard__category">
                <p>{(amount / budgetTotal) * 100}%</p>
                <p>{name}</p>
                <p>${spent} spent</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dashboard;
