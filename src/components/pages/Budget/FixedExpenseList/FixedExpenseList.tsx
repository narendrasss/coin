import * as React from 'react';
import { IFixedExpense } from '../../../../types';
import FixedExpenseCard from './FixedExpenseCard/FixedExpenseCard';
import style from './FixedExpenseList.module.scss';

class FixedExpenseList extends React.Component<{ expenses: IFixedExpense[] }, {}> {
  render() {
    return (
      <div className={style.container}>
        {this.props.expenses.map(fe => (
          <FixedExpenseCard key={fe.name} expense={fe} />
        ))}
      </div>
    );
  }
}

export default FixedExpenseList;
