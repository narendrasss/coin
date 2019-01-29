import * as React from 'react';
import Moment from 'moment';

import { Category, Transaction } from '../../../types';
import DropDown from '../../DropDown/DropDown';

interface Props {
  categories: Category[];
}

interface State {
  vendor: string;
  period: string;
  result: number;
}

class ExpenseCalculator extends React.Component<Props, State> {
  state: State = {
    vendor: '',
    period: 'In the last month',
    result: 0
  };

  private handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target instanceof HTMLSelectElement) {
      this.setState(
        {
          vendor: e.target.value
        },
        this.getResult
      );
    }
  };

  private handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target instanceof HTMLSelectElement) {
      this.setState(
        {
          period: e.target.value
        },
        this.getResult
      );
    }
  };

  private getResult = () => {
    const { vendor, period } = this.state;
    const { categories } = this.props;

    const query = period.split(' ');
    const time = query[query.length - 1] as Moment.DurationInputArg2;
    const min = Moment().subtract(1, time);

    const transactions = categories
      .reduce((acc: Transaction[], ctg: Category) => [...acc, ...ctg.transactions], [])
      .filter((tr: Transaction) => tr.vendor === vendor);

    const result = transactions
      .filter(tr => Moment(tr.date, 'DD-MM-YYYY').isAfter(min))
      .reduce((acc, tr) => acc + tr.amount, 0);

    this.setState({ result });
  };

  private getVendorOptions = (categories: Category[]) => [
    ...new Set(
      categories
        .reduce((acc: Transaction[], ctg: Category) => [...acc, ...ctg.transactions], [])
        .map(tr => tr.vendor)
    )
  ];

  public render() {
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

export default ExpenseCalculator;
