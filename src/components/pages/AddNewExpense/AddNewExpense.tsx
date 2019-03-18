import React, { Component } from 'react';
import moment from 'moment';
import { RouteComponentProps, navigate } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { BackButton, SubmitButton } from '../../buttons';
import { TextInput } from '../../form';
import coin from '../../../client';
import { CoinError } from '../../../types';
import Loading from '../Loading/Loading';
import CategorySelectionList from '../../general/CategorySelectionList/CategorySelectionList';

const client = coin();

type State = {
  categories: string[];
  vendor: string;
  amount: number;
  date?: string;
  category: string;
  loading: boolean;
  errors?: CoinError;
};

class AddNewExpense extends Component<RouteComponentProps> {
  state = {
    categories: [] as string[],
    vendor: '',
    amount: 0,
    loading: false
  } as State;

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <MainContainer>
        <BackButton to="/home" />
        <form onSubmit={this._handleSubmit}>
          <h1 style={{ marginBottom: '1.5rem' }}>New Expense</h1>
          <TextInput
            label="Vendor Name"
            name="vendor"
            value={this.state.vendor}
            onChange={this._handleInputChange}
            required
          />
          <div style={{ display: 'flex' }}>
            <TextInput
              label="Amount"
              name="amount"
              value={this.state.amount}
              onChange={this._handleInputChange}
              type="number"
              style={{ marginRight: '1rem' }}
              required
            />
            <TextInput
              label="Date"
              name="date"
              value={this.state.date || moment().format('YYYY-MM-DD')}
              onChange={this._handleInputChange}
              type="date"
              required
            />
          </div>
          <CategorySelectionList
            categories={this.state.categories}
            onAdd={this._handleCategoryAdd}
            onDelete={this._handleCategoryDelete}
            getClicked={this._getClicked}
            style={{ marginBottom: '1.5rem' }}
          />
          <TextInput
            label="Category"
            name="category"
            value={this.state.category}
            onChange={this._handleInputChange}
            required
          />
          <SubmitButton>Add new expense</SubmitButton>
        </form>
      </MainContainer>
    );
  }

  async componentDidMount() {
    await this.setState({ loading: true });
    try {
      const categories = await client.category.getAll();
      this.setState({ loading: false, categories: categories.data.map(ctg => ctg.name) });
    } catch (err) {
      this.setState({ loading: false, errors: err });
    }
  }

  _handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    const { vendor, amount, date, category } = this.state;
    this.setState({ loading: true }, () => {
      client.transactions
        .create({ vendor, amount, date: moment(date).toDate(), category })
        .then(() => {
          this.setState({ loading: false }, () => navigate('/home'));
        })
        .catch(err => {
          this.setState({ loading: false, errors: err });
        });
    });
  };

  _handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleCategoryAdd = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    this.setState({ category: name });
  };

  _handleCategoryDelete = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    this.setState({ category: null });
  };

  _getClicked = (name: string) => this.state.category === name;
}

export default AddNewExpense;
