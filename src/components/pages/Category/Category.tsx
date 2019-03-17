import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
import coin from '../../../client';
import { ICategory, CoinError, ITransaction } from '../../../types';
import Loading from '../Loading/Loading';
import MainContainer from '../MainContainer/MainContainer';
import TransactionList from '../../general/TransactionList/TransactionList';
import { BackButton } from '../../buttons';
import styles from './Category.module.scss';

const client = coin();

type Params = {
  id: string;
};

interface State extends ICategory {
  loading: boolean;
  transactions: ITransaction[];
  errors?: CoinError;
}

class Category extends Component<RouteComponentProps<Params>, State> {
  state = {
    name: '',
    budget: 0,
    spent: 0,
    transactions: [],
    loading: false
  } as State;

  render() {
    const { name, spent, budget, loading, transactions, errors } = this.state;
    if (loading) return <Loading />;
    return (
      <MainContainer>
        <BackButton to="/home" />
        <header className={styles.header}>
          <h1>{name}</h1>
          <p>${spent.toFixed(2)}</p>
        </header>
        <div className={styles.subheader}>
          <p>Total budget</p>
          <p>${budget.toFixed(2)}</p>
        </div>
        <section className={styles.transactions}>
          <h1 className={styles.transactionTitle}>Recent transactions</h1>
          <TransactionList transactions={transactions} />
        </section>
      </MainContainer>
    );
  }

  async componentDidMount() {
    if (this.props.id) {
      await this.setState({ loading: true });
      try {
        const ctg = await client.category.getOne(this.props.id);
        const trs = await client.transactions.getAll({ category: ctg.data.name, max: 10 });
        this.setState({ ...ctg.data, transactions: trs.data, loading: false });
      } catch (err) {
        this.setState({ loading: false, errors: err });
      }
    }
  }
}

export default Category;
