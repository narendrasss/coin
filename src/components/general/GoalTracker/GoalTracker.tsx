import * as React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './GoalTracker.module.scss';

type Props = {
  funds: number;
  amount: number;
};

const GoalTracker: React.FC<Props> = ({ funds, amount }) => (
  <>
    <ProgressBar
      color="linear-gradient(98deg, #416788, #78DEA3)"
      percentage={funds / amount}
      goal
    />
    <div className={style.infoWrapper}>
      <div
        style={{
          position: 'absolute',
          left: `${(funds / amount) * 100}%`,
          transform: `translateX(-${(funds / amount) * 100}%)`
        }}
        className={style.info}
      >
        <p className={style.money}>${funds.toLocaleString()}</p>
      </div>
      <div className={style.info}>
        <p className={style.money}>${amount.toLocaleString()}</p>
      </div>
    </div>
  </>
);

export default GoalTracker;
