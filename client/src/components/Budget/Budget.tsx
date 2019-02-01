import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Category, FixedExpense, User } from '../../types';
import LinkButton from '../LinkButton/LinkButton';
import FixedExpenseList from './FixedExpenseList/FixedExpenseList';
import style from './Budget.module.scss';
import BackButton from '../BackButton/BackButton';
import PieChart from '../PieChart/PieChart';
import ProgressBar from '../ProgressBar/ProgressBar';
import GoalTracker from '../GoalTracker/GoalTracker';

type Props = {
  user: User;
  categories: Category[];
  fixedExpenses: FixedExpense[];
};

class Budget extends React.Component<Props & RouteComponentProps, {}> {
  private getExpenseTotal() {
    const { fixedExpenses } = this.props;
    return fixedExpenses.reduce((acc, fe) => acc + fe.amount, 0);
  }

  public render() {
    const { income } = this.props.user;
    const { funds, goal, due } = this.props.user.goal;
    return (
      <div className={style.container}>
        <BackButton />
        <header className={style.header}>
          <h1 style={{ fontWeight: 'normal' }}>My Budget</h1>
          <div className={style.budgetInfo}>
            <p className={style.budget}>${(income - this.getExpenseTotal()).toLocaleString()}</p>
            <p className={style.incomeCaption}>Available to spend</p>
          </div>
        </header>
        <div className={style.info}>
          <PieChart outerRadius="16rem" innerRadius="9rem">
            <h1 className={style.income}>${income.toLocaleString()}</h1>
            <p className={style.incomeCaption}>Total Income</p>
          </PieChart>
        </div>
        <h3 className={style.subtitle}>I would like to:</h3>
        <div>
          <LinkButton style={{ marginBottom: '0.5rem' }} to="./add-monthly-expense">
            Add new monthly expense
          </LinkButton>
          <div style={{ display: 'flex' }}>
            <LinkButton style={{ marginRight: '0.5rem' }} to="/">
              Modify my goal
            </LinkButton>
            <LinkButton to="/">Modify my income</LinkButton>
          </div>
        </div>
        <h3 style={{ marginBottom: 0 }} className={style.subtitle}>
          Fixed expenses
        </h3>
        <FixedExpenseList expenses={this.props.fixedExpenses} />
        <h3 className={style.subtitle}>Goal</h3>
        <div>
          <p>Savings</p>
          <p>Due: {due.toDateString()}</p>
        </div>
        <GoalTracker funds={funds} goal={goal} />
      </div>
    );
  }
}

export default Budget;
