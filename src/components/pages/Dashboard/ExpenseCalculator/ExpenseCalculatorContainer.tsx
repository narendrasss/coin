import React, { Component, ChangeEventHandler } from 'react';
import { CoinError, ICategory, PeriodOptions } from '../../../../types';
import coin from '../../../../client';
import ExpenseCalculator from './ExpenseCalculator';

const client = coin();

const PERIOD_OPTIONS = [PeriodOptions.Day, PeriodOptions.Week, PeriodOptions.Month];

type State = {
  vendor: string;
  period: string;
  options: string[];
  result: number;
  loading: boolean;
  errors?: CoinError;
};

class ExpenseCalculatorContainer extends Component<{}, State> {
  state = {
    vendor: '',
    period: '',
    options: [],
    result: 0,
    loading: false
  } as State;

  public render() {
    return (
      <ExpenseCalculator
        periodOptions={PERIOD_OPTIONS}
        onVendorChange={this._handleVendorChange}
        onPeriodChange={this._handlePeriodChange}
        {...this.state}
      />
    );
  }

  public async componentDidMount() {
    try {
      await this.setState({ loading: true });

      const res = await client.transactions.vendors();
      const options = res.data.map(vendor => {
        const values = vendor.split(' ');
        return values.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      });
      this.setState({ loading: false, options });
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  }

  private _handleVendorChange: ChangeEventHandler<HTMLSelectElement> = e => {
    this.setState({ vendor: e.target.value }, () => this._getResult());
  };

  private _handlePeriodChange: ChangeEventHandler<HTMLSelectElement> = e => {
    this.setState({ period: e.target.value }, () => this._getResult());
  };

  private async _getResult() {
    const { vendor, period } = this.state;
    const values = period.split(' ');
    let time = values[values.length - 1];
    if (time === 'hours') time = 'day';

    try {
      await this.setState({ loading: true });
      const res = await client.transactions.getAll({ vendor: vendor.toLowerCase(), period: time });
      this.setState({ loading: false, result: res.total });
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  }
}

export default ExpenseCalculatorContainer;
