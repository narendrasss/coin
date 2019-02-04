import * as React from 'react';

import { Category } from '../../../types';
import LinkButton from '../../LinkButton/LinkButton';
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
        <LinkButton to="/categories">See all categories</LinkButton>
        <LinkButton to="/">Add new expense</LinkButton>
      </div>
    );
  }
}

export default DashboardGraph;
