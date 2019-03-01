import React, { Component } from 'react';
import coin from '../../../../client';
import { ICategory, CoinError } from '../../../../types';
import Summary from './Summary';

const client = coin();

type State = {
  categories: ICategory[];
  loading: boolean;
  errors?: CoinError;
};

class SummaryContainer extends Component<{}, State> {
  state = {
    categories: [],
    loading: false
  };

  public render() {
    return <Summary {...this.state} />;
  }

  public componentDidMount() {
    this._loadContent();
  }

  private async _loadContent() {
    try {
      await this.setState({ loading: true });
      const res = await client.category.getAll();
      this.setState({ loading: false, categories: res.data });
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  }
}

export default SummaryContainer;
