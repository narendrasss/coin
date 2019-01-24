import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import DropDown from '../../DropDown/DropDown';

class ExpenseCalculator extends Component {
  state = {
    vendor: '',
    period: 'In the last month',
    result: 0
  };

  handleVendorChange = event => {
    this.setState(
      {
        vendor: event.target.value
      },
      this.getResult
    );
  };

  handlePeriodChange = event => {
    this.setState(
      {
        period: event.target.value
      },
      this.getResult
    );
  };

  getResult = () => {
    const { vendor, period } = this.state;
    const { categories } = this.props;

    const query = period.split(' ');
    const time = query[query.length - 1];
    const min = Moment().subtract(1, time);

    const transactions = categories
      .reduce((acc, ctg) => [...acc, ...ctg.transactions], [])
      .filter(tr => tr.vendor === vendor);

    const result = transactions
      .filter(tr => Moment(tr.date, 'DD-MM-YYYY').isAfter(min))
      .reduce((acc, tr) => acc + tr.amount, 0);

    this.setState({ result });
  };

  getVendorOptions = categories => [
    ...new Set(
      categories.reduce((acc, ctg) => [...acc, ...ctg.transactions], []).map(tr => tr.vendor)
    )
  ];

  render() {
    const { vendor, period, result } = this.state;
    const { categories } = this.props;
    const periodOptions = ['In the last day', 'In the last month', 'In the last year'];
    const vendorOptions = this.getVendorOptions(categories);
    return (
      <div className="ExpenseCalculator">
        <form className="Expense__inputs">
          <DropDown name={vendor} change={this.handleVendorChange} options={vendorOptions} />
          <DropDown name={period} change={this.handlePeriodChange} options={periodOptions} />
        </form>
        <div>
          <p>You spent:</p>
          <p>${result}</p>
        </div>
      </div>
    );
  }
}

ExpenseCalculator.propTypes = {
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
  ).isRequired
};

export default ExpenseCalculator;
