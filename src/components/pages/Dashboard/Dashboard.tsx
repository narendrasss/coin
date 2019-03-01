import React, { Component } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { IUser, CoinError } from '../../../types';
import coin from '../../../client';
import Loading from '../Loading/Loading';
import GoalHeader from './GoalHeader/GoalHeader';
import SummaryContainer from './Summary/SummaryContainer';
import ExpenseCalculatorContainer from './ExpenseCalculator/ExpenseCalculatorContainer';

const client = coin();

interface DashboardState extends IUser {
  loading: boolean;
  errors?: CoinError;
}

const defaultUser = {
  email: '',
  name: '',
  income: 0,
  goal: {
    goal: '',
    funds: 0,
    amount: 0,
    payment: 0,
    due: ''
  }
} as IUser;

class Dashboard extends Component<RouteComponentProps, DashboardState> {
  state = { ...defaultUser, loading: false };

  public render() {
    const { goal, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <MainContainer style={{ padding: '6rem 0' }}>
        <GoalHeader funds={goal.funds!} amount={goal.amount} />
        <SummaryContainer />
        <ExpenseCalculatorContainer />
      </MainContainer>
    );
  }

  public async componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    await this.setState({ loading: true });
    try {
      const res = await client.user.me();
      this.setState({ ...res.data, loading: false });
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  }
}

export default Dashboard;
