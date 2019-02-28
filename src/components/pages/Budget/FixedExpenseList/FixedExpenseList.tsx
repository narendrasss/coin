import * as React from 'react';
import { IFixedExpense } from '../../../../types';
import FixedExpenseCard from './FixedExpenseCard/FixedExpenseCard';
import style from './FixedExpenseList.module.scss';

const FixedExpenseList: React.FC<{ expenses: IFixedExpense[] }> = ({ expenses }) => (
  <div className={style.container}>
    {expenses.map(fe => (
      <FixedExpenseCard key={fe.name} expense={fe} />
    ))}
  </div>
);

export default FixedExpenseList;
