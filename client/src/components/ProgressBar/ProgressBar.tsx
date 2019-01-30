import * as React from 'react';

import './ProgressBar.scss';

interface Props {
  percentage: number;
}

class ProgressBar extends React.Component<Props, {}> {
  public render() {
    const { percentage } = this.props;
    const style = {
      width: `${percentage * 100}%`
    };
    return (
      <div className="ProgressBar">
        <div className="Progress">
          <div className="Progress__circle Progress__circle--left" />
          <div style={style} className="bar" />
          <div className="Progress__circle Progress__circle--right" />
        </div>
      </div>
    );
  }
}

export default ProgressBar;
