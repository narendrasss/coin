import * as React from 'react';
import { FixedExpense } from '../../../types';
import FixedExpenseCard from './FixedExpenseCard/FixedExpenseCard';
import style from './FixedExpenseList.module.scss';

class FixedExpenseList extends React.Component<{ expenses: FixedExpense[] }, {}> {
  render() {
    return (
      <div className={style.container}>
        <h3 className={style.title}>Fixed expenses</h3>
        {this.props.expenses.map(fe => (
          <FixedExpenseCard expense={fe} />
        ))}
      </div>
    );
  }
}

export default FixedExpenseList;
