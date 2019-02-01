import React from 'react';

import ProgressBar from '../../../ProgressBar/ProgressBar';
import './CategoryBar.scss';

interface Props {
  proportion: number;
  name: string;
  amount: number;
  spent?: number;
}

class CategoryBar extends React.Component<Props, {}> {
  public render() {
    const { proportion, name, amount, spent = 0 } = this.props;
    return (
      <div className="CategoryBar">
        <p className="CategoryBar__proportion">{proportion}%</p>
        <p className="CategoryBar__name">{name}</p>
        <p className="CategoryBar__spent opaque">${spent}</p>
      </div>
    );
  }
}

export default CategoryBar;
