import * as React from 'react';

import style from './ProgressBar.module.scss';

interface Props {
  color: string;
  percentage: number;
  goal?: boolean;
}

class ProgressBar extends React.Component<Props, {}> {
  public render() {
    const { color, percentage, goal } = this.props;
    return (
      <div className={style.wrapper}>
        <div
          style={{ background: color, width: `${percentage * 100}%` }}
          className={goal ? style.barGoal : style.bar}
        />
      </div>
    );
  }
}

export default ProgressBar;
