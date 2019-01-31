import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Moment from 'moment';

import { Category, Transaction, User } from '../../types';
import DashboardGraph from './DashboardGraph/DashboardGraph';
import ExpenseCalculator from './ExpenseCalculator/ExpenseCalculator';
import GoalProgressBar from './GoalProgressBar/GoalProgressBar';
import LinkButton from '../LinkButton/LinkButton';

import './Dashboard.scss';

type Props = {
  user: User;
  categories: Category[];
};

class Dashboard extends React.Component<Props & RouteComponentProps, {}> {
  private toCurrency(num: number, currency: string): string {
    return num.toLocaleString('en', { style: 'currency', currency });
  }

  private updateCategories() {
    const { categories } = this.props;
    categories.forEach(
      ctg => (ctg.spent = ctg.transactions.reduce((acc, tr) => acc + tr.amount, 0))
    );
  }

  private getInfo() {
    const { user, categories } = this.props;
    const { funds, goal } = user.goal;
    const total = categories.reduce((acc, ctg) => acc + ctg.amount, 0);
    const expense = categories
      .reduce((acc: Transaction[], ctg: Category) => [...acc, ...ctg.transactions], [])
      .reduce((acc: number, tr: Transaction) => acc + tr.amount, 0);

    return { funds, goal, total, expense };
  }

  public render() {
    const { categories } = this.props;

    this.updateCategories();
    const { funds, goal, total, expense } = this.getInfo();

    return (
      <div className="Dashboard">
        <header className="Dashboard__goal">
          <h1>{this.toCurrency(goal - funds, 'USD')}</h1>
          <p>Left until you reach your goal!</p>
          <GoalProgressBar funds={funds} goal={goal} />
          <LinkButton to="budget">View my budget</LinkButton>
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
