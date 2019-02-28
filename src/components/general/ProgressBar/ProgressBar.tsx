import * as React from 'react';
import localStyle from './ProgressBar.module.scss';

type Props = {
  percentage: number;
  color?: string;
  goal?: boolean;
  style?: React.CSSProperties;
};

const ProgressBar: React.FC<Props> = ({ percentage, color = '#ED5572', goal, style }) => (
  <div style={style} className={localStyle.wrapper}>
    <div
      style={{ background: color, width: `${percentage * 100}%` }}
      className={goal ? localStyle.barGoal : localStyle.bar}
    />
  </div>
);

export default ProgressBar;
