import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { ICategory, CoinError } from '../../../types';
import coin from '../../../client';
import Loading from '../Loading/Loading';
import CategoryInfoList from './CategoryInfoList/CategoryInfoList';

const client = coin();

interface CategoriesState {
  categories: ICategory[];
  loading: boolean;
  errors?: CoinError;
}

class Categories extends Component<RouteComponentProps, CategoriesState> {
  state: CategoriesState = {
    categories: [],
    loading: false
  };

  public render() {
    const { categories, loading, errors } = this.state;
    if (loading) return <Loading />;
    if (errors) return <p>{errors.message}</p>;
    return (
      <MainContainer>
        <p>
          Transactions by <span>category</span>
        </p>
        <header>
          <p>
            This month's <span>remainder</span>
          </p>
          <h1 />
        </header>
        <CategoryInfoList categories={categories} />
      </MainContainer>
    );
  }

  public componentDidMount() {
    this.setState({ loading: true }, () => {
      client.category
        .getAll()
        .then(res => this.setState({ loading: false, categories: res.data }))
        .catch(errors => this.setState({ loading: false, errors }));
    });
  }
}

export default Categories;
