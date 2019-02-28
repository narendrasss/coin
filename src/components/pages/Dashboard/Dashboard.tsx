import React, { Component } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { IUser, CoinError } from '../../../types';
import coin from '../../../client';
import Loading from '../Loading/Loading';
import GoalHeader from './GoalHeader/GoalHeader';
import SummaryContainer from './Summary/SummaryContainer';

const client = coin();

interface DashboardState extends IUser {
  loading: boolean;
  errors?: CoinError;
}

const defaultUser: IUser = {
  email: '',
  name: '',
  income: 0,
  budget: 0,
  goal: {
    goal: '',
    funds: 0,
    amount: 0,
    payment: 0,
    due: ''
  }
};

class Dashboard extends Component<RouteComponentProps, DashboardState> {
  state = { ...defaultUser, loading: false };

  public render() {
    const { budget, goal, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <MainContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
        <GoalHeader funds={goal.funds!} amount={goal.amount} />
        <SummaryContainer />
      </MainContainer>
    );
  }

  public async componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    await this.setState({ loading: true });
    try {
      const res = await client.user.me();
      this.setState({ ...res, loading: false });
    } catch (e) {
      this.setState({ loading: false, errors: e.error });
    }
  }
}

export default Dashboard;
