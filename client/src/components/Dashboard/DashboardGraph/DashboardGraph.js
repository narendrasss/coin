import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryBar from './CategoryBar/CategoryBar';
import './DashboardGraph.scss';

class DashboardGraph extends Component {
  getCategoryEl = category => {
    const { total } = this.props;
    const { name, amount, spent } = category;
    const proportion = (amount / total) * 100;
    return (
      <CategoryBar key={name} proportion={proportion} name={name} amount={amount} spent={spent} />
    );
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="DashboardGraph">
        <div className="Dashboard__graph" />
        {categories.map(this.getCategoryEl)}
      </div>
    );
  }
}

DashboardGraph.propTypes = {
  total: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.number,
          vendor: PropTypes.string,
          amount: PropTypes.number,
          date: PropTypes.string
        })
      )
    })
  )
};

DashboardGraph.defaultProps = {
  categories: []
};

export default DashboardGraph;
