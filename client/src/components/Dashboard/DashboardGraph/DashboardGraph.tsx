import * as React from 'react';

import { Category } from '../../../types';
import Button from '../../Button/Button';
import CategoryBar from './CategoryBar/CategoryBar';
import './DashboardGraph.scss';

interface Props {
  total: number;
  categories: Category[];
}

class DashboardGraph extends React.Component<Props, {}> {
  private getCategoryEl = (category: Category) => {
    const { total } = this.props;
    const { name, amount, spent } = category;
    const proportion = (amount / total) * 100;
    return (
      <CategoryBar key={name} proportion={proportion} name={name} amount={amount} spent={spent} />
    );
  };

  public render() {
    const { categories } = this.props;
    return (
      <div className="DashboardGraph">
        <div className="Dashboard__graph" />
        {categories.map(this.getCategoryEl)}
        <Button to="/">See all categories</Button>
        <Button to="/">Add new expense</Button>
      </div>
    );
  }
}

export default DashboardGraph;
