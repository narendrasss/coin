import React, { Component } from 'react';
import Moment from 'moment';

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

  render() {
    const { vendor, period, result } = this.state;
    const { categories } = this.props;
    const periodOptions = ['In the last day', 'In the last month', 'In the last year'];
    const vendorOptions = [
      ...new Set(
        categories.reduce((acc, ctg) => [...acc, ...ctg.transactions], []).map(tr => tr.vendor)
      )
    ];
    return (
      <div className="ExpenseCalculator">
        <form className="Expense__inputs">
          <label htmlFor="vendor">
            <select
              id="vendor"
              value={vendor}
              onChange={this.handleVendorChange}
              onBlur={this.handleVendorChange}
            >
              {vendorOptions.map(vendorName => (
                <option key={vendorName} value={vendorName}>
                  {vendorName}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="period">
            <select
              id="period"
              value={period}
              onChange={this.handlePeriodChange}
              onBlur={this.handlePeriodChange}
            >
              {periodOptions.map(periodName => (
                <option key={periodName} value={periodName}>
                  {periodName}
                </option>
              ))}
            </select>
          </label>
        </form>
        <div>
          <p>You spent:</p>
          <p>${result}</p>
        </div>
      </div>
    );
  }
}

export default ExpenseCalculator;
