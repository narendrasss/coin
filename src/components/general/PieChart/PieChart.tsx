import React, { FC, CSSProperties } from 'react';
import localStyle from './PieChart.module.scss';

// TODO: Make this component take data and render correctly (use D3)

type Props = {
  outerRadius: string;
  innerRadius: string;
  style?: CSSProperties;
};

const PieChart: FC<Props> = ({ outerRadius, innerRadius, style, children }) => (
  <div style={{ ...style, width: outerRadius, height: outerRadius }} className={localStyle.outer}>
    <div style={{ width: innerRadius, height: innerRadius }} className={localStyle.inner}>
      {children}
    </div>
  </div>
);

export default PieChart;
