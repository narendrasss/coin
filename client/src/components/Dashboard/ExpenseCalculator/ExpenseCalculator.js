import React, { Component } from 'react';
import Moment from 'moment';

class ExpenseCalculator extends Component {
  state = {
    vendor: '',
    period: 'Last Month',
    result: 0
  };

  handleVendorChange = event => {
    this.setState({
      vendor: event.target.value
    });
  };

  handlePeriodChange = event => {
    this.setState({
      period: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { vendor, period } = this.state;
    const { categories } = this.props;

    const time = period.split(' ')[1];
    const min = Moment().subtract(1, time);

    const transactions = categories
      .reduce((acc, ctg) => [...acc, ...ctg.transactions], [])
      .filter(tr => tr.vendor === vendor);

    const result = transactions
      .filter(tr => Moment(tr.date).isAfter(min))
      .reduce((acc, tr) => acc + tr.amount, 0);

    this.setState({ result });
  };

  render() {
    const { vendor, period, result } = this.state;
    const { categories } = this.props;
    const periodOptions = ['Last Day', 'Last Month', 'Last Year'];
    const vendorOptions = categories
      .reduce((acc, ctg) => [...acc, ...ctg.transactions], [])
      .map(tr => tr.vendor);
    return (
      <div className="ExpenseCalculator">
        <form className="Expense__inputs">
          <label htmlFor="vendor">
            Vendor
            <select
              id="vendor"
              value={vendor}
              onChange={this.handleVendorChange}
              onBlur={this.handleVendorChange}
            >
              <option />
              {vendorOptions.map(vendorName => (
                <option key={vendorName} value={vendorName}>
                  {vendorName}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="period">
            Period
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
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
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
