import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Category, Transaction, FixedExpense, User } from '../../types';
import Button from '../Button/Button';
import FixedExpenseList from './FixedExpenseList/FixedExpenseList';
import style from './Budget.module.scss';

type Props = {
  user: User;
  categories: Category[];
  fixedExpenses: FixedExpense[];
};

class Budget extends React.Component<Props & RouteComponentProps, {}> {
  public render() {
    return (
      <div className={style.container}>
        <h3 className={style.title}>I would like to:</h3>
        <div>
          <Button style={{ marginBottom: '0.5rem' }} to="/">
            Add new monthly expense
          </Button>
          <div style={{ display: 'flex' }}>
            <Button style={{ marginRight: '0.5rem' }} to="/">
              Modify my goal
            </Button>
            <Button to="/">Modify my income</Button>
          </div>
        </div>
        <h3 className={style.title}>Fixed expenses</h3>
        <FixedExpenseList expenses={this.props.fixedExpenses} />
        <h3 className={style.title}>Goal</h3>
      </div>
    );
  }
}

export default Budget;
