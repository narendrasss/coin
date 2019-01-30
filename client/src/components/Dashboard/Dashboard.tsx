import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Moment from 'moment';

import { Category, Transaction } from '../../types';
import DashboardGraph from './DashboardGraph/DashboardGraph';
import ExpenseCalculator from './ExpenseCalculator/ExpenseCalculator';
import GoalProgressBar from './GoalProgressBar/GoalProgressBar';
import Button from '../Button/Button';

import './Dashboard.scss';

interface Props {
  funds: number;
  goal: number;
  categories: Category[];
}

class Dashboard extends React.Component<Props & RouteComponentProps, {}> {
  private toCurrency(num: number, currency: string): string {
    return num.toLocaleString('en', { style: 'currency', currency });
  }

  public render() {
    const { funds, goal, categories } = this.props;

    const total = categories.reduce((acc, ctg) => acc + ctg.amount, 0);

    const expense = categories
      .reduce((acc: Transaction[], ctg: Category) => [...acc, ...ctg.transactions], [])
      .reduce((acc: number, tr: Transaction) => acc + tr.amount, 0);

    for (const ctg of categories) {
      ctg.spent = ctg.transactions.reduce((acc, tr) => acc + tr.amount, 0);
    }

    return (
      <div className="Dashboard">
        <header className="Dashboard__goal">
          <h1>{this.toCurrency(goal - funds, 'USD')}</h1>
          <p>Left until you reach your goal!</p>
          <GoalProgressBar funds={funds} goal={goal} />
          <Button to="budget">View my budget</Button>
        </header>
        <div className="Dashboard__info">
          <p className="opaque">{Moment().format('MMMM DD, YYYY')}</p>
          <p>{this.toCurrency(total - expense, 'USD')} left to spend</p>
          <DashboardGraph total={total} categories={categories} />
        </div>
        <ExpenseCalculator categories={categories} />
      </div>
    );
  }
}

export default Dashboard;
