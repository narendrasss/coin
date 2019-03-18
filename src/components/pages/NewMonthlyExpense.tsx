import React, { Component } from 'react';
import { CoinError } from '../../types';
import { RouteComponentProps } from '@reach/router';
import Loading from './Loading/Loading';
import MainContainer from './MainContainer/MainContainer';
import { BackButton, SubmitButton } from '../buttons';
import { TextInput } from '../form';
import coin from '../../client';

const client = coin();

type State = {
  name: string;
  amount: number;
  loading: boolean;
  errors?: CoinError;
};

class NewMonthlyExpense extends Component<RouteComponentProps, State> {
  state: State = {
    name: '',
    amount: 0,
    loading: false
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <MainContainer>
        <BackButton to="/home" />
        <form onSubmit={this._handleSubmit}>
          <h1 style={{ marginBottom: '1.5rem' }}>New Monthly Expense</h1>
          <TextInput
            label="Vendor Name"
            name="vendor"
            value={this.state.vendor}
            onChange={this._handleInputChange}
            required
          />
          <TextInput
            label="Amount"
            name="amount"
            value={this.state.amount}
            onChange={this._handleInputChange}
            type="number"
            style={{ marginRight: '1rem' }}
            required
          />
          <SubmitButton>Add new expense</SubmitButton>
        </form>
      </MainContainer>
    );
  }
}

export default NewMonthlyExpense;
