import * as React from 'react';
import style from './PieChart.module.scss';

// TODO: Make this component take data and render correctly (use D3)

type Props = {
  outerRadius: string;
  innerRadius: string;
};

class PieChart extends React.Component<Props, {}> {
  render() {
    const { outerRadius, innerRadius, children } = this.props;
    return (
      <div style={{ width: outerRadius, height: outerRadius }} className={style.outer}>
        <div style={{ width: innerRadius, height: innerRadius }} className={style.inner}>
          {children}
        </div>
      </div>
    );
  }
}

export default PieChart;
