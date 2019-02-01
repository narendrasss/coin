import * as React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './GoalTracker.module.scss';

type Props = {
  funds: number;
  goal: number;
};

class GoalTracker extends React.Component<Props, {}> {
  render() {
    const { funds, goal } = this.props;
    return (
      <div>
        <ProgressBar
          color="linear-gradient(98deg, #416788, #78DEA3)"
          percentage={funds / goal}
          goal
        />
        <div className={style.infoWrapper}>
          <div
            style={{
              position: 'absolute',
              left: `${(funds / goal) * 100}%`,
              transform: `translateX(-${(funds / goal) * 100}%)`
            }}
            className={style.info}
          >
            <p className={style.money}>${funds.toLocaleString()}</p>
            <p>Current Funds</p>
          </div>
          <div className={style.info}>
            <p className={style.money}>${goal.toLocaleString()}</p>
            <p>Goal</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalTracker;
