import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import DashboardGraph from './DashboardGraph/DashboardGraph';
import ExpenseCalculator from './ExpenseCalculator/ExpenseCalculator';
import Button from '../Button/Button';

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
        <h1>{(goal - funds).toLocaleString('en', { style: 'currency', currency: 'USD' })}</h1>
        <p>Left until you reach your goal!</p>
        <Button to="/">View my budget</Button>
      </header>
      <div className="Dashboard__info">
        <p className="opaque">{Moment().format('MMMM DD, YYYY')}</p>
        <p>
          {(total - expense).toLocaleString('en', { style: 'currency', currency: 'USD' })} left to
          spend
        </p>
        <DashboardGraph total={total} categories={categories} />
      </div>
      <ExpenseCalculator categories={categories} />
    </div>
  );
};

Dashboard.propTypes = {
  funds: PropTypes.number,
  goal: PropTypes.number,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.number,
          vendor: PropTypes.string,
          amount: PropTypes.number,
          date: PropTypes.string
        })
      )
    })
  )
};

Dashboard.defaultProps = {
  funds: 0,
  goal: 0,
  categories: []
};

export default Dashboard;
