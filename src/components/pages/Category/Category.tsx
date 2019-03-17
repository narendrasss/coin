import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import coin from '../../../client';
import { ICategory, CoinError } from '../../../types';
import Loading from '../Loading/Loading';
import MainContainer from '../MainContainer/MainContainer';

const client = coin();

type Params = {
  id: string;
};

interface State extends ICategory {
  loading: boolean;
  errors?: CoinError;
}

class Category extends Component<RouteComponentProps<Params>, State> {
  state = {
    loading: false
  } as State;

  render() {
    const { name, spent, budget, loading, errors } = this.state;
    if (loading) return <Loading />;
    return (
      <MainContainer>
        <header>
          <h1>{name}</h1>
          <p>{spent}</p>
        </header>
        <div>
          <p>Total budget</p>
          <p>{budget}</p>
        </div>
      </MainContainer>
    );
  }

  async componentDidMount() {
    if (this.props.id) {
      await this.setState({ loading: true });
      client.category
        .getOne(this.props.id)
        .then(res => this.setState({ ...res.data, loading: false }))
        .catch(err => this.setState({ loading: false, errors: err }));
    }
  }
}

export default Category;
