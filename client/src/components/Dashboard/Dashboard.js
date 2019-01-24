import React from 'react';
import ExpenseCalculator from './ExpenseCalculator/ExpenseCalculator';
import './Dashboard.scss';

const Dashboard = props => {
  const { funds, goal, categories } = props;

  const total = categories.reduce((acc, ctg) => acc + ctg.amount, 0);

  const expense = categories
    .reduce((acc, ctg) => [...acc, ...ctg.transactions], [])
    .reduce((acc, tr) => acc + tr.amount, 0);

  for (const ctg of categories) {
    ctg.spent = ctg.transactions.reduce((acc, tr) => acc + tr.amount, 0);
  }

  return (
    <div className="Dashboard">
      <header className="Dashboard__goal">
        <h1>${goal - funds}</h1>
        <p>Left until you reach your goal!</p>
      </header>
      <div className="Dashboard__info">
        <p className="opaque">{new Date().toDateString()}</p>
        <p>{total - expense} remaining in budget.</p>
        <div className="Dashboard__graph" />
        {categories.map(ctg => {
          const { name, amount, spent } = ctg;
          return (
            <div key={name} className="Dashboard__category">
              <p>{(amount / total) * 100}%</p>
              <p>{name}</p>
              <p>${spent} spent</p>
            </div>
          );
        })}
      </div>
      <ExpenseCalculator categories={categories} />
    </div>
  );
};

export default Dashboard;
