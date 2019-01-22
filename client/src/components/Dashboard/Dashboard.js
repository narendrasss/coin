import React, { Component } from 'react';

class Dashboard extends Component {
  state = {
    funds: 0,
    goal: 0,
    budgetTotal: 0,
    categories: [],
    expenseTotal: 0
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
      <div>
        <h1>{goal - funds}</h1>
        <p>Left until you reach your goal!</p>
        <p>{budgetTotal - expenseTotal} remaining in budget.</p>
        {categories.map(ctg => {
          const { name, amount, spent } = ctg;
          return (
            <div>
              <p>{(amount / budgetTotal) * 100}%</p>
              <p>{name}</p>
              <p>{spent} spent</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
