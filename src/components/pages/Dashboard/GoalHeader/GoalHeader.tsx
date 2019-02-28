import React, { FC } from 'react';
import style from './GoalHeader.module.scss';
import { GoalTracker } from '../../../general';
import { LinkButton } from '../../../buttons';

type Props = {
  funds: number;
  amount: number;
};

const GoalHeader: FC<Props> = ({ funds, amount }) => (
  <header className={style.container}>
    <div className={style.header}>
      <h1>${(amount - funds).toLocaleString()}</h1>
      <p>Left until you reach your goal!</p>
    </div>
    <GoalTracker funds={funds} amount={amount} />
    <LinkButton style={{ fontSize: '0.9em' }} to="/budget" icon="angle-right">
      View my budget
    </LinkButton>
  </header>
);

export default GoalHeader;
