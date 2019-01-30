import * as React from 'react';
import ProgressBar from '../../ProgressBar/ProgressBar';

interface Props {
  funds: number;
  goal: number;
}

class GoalProgressBar extends React.Component<Props, {}> {
  public render() {
    const { funds, goal } = this.props;
    return (
      <div className="GoalProgressBar">
        <ProgressBar percentage={funds / goal} />
      </div>
    );
  }
}

export default GoalProgressBar;
