import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { IUser, CoinError } from '../../../types';
import coin from '../../../client';
import Loading from '../Loading/Loading';

interface DashboardState extends IUser {
  loading: boolean;
  errors?: CoinError;
}

const defaultUser: IUser = {
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
};

class Dashboard extends React.Component<RouteComponentProps, Partial<DashboardState>> {
  state: DashboardState = { ...defaultUser, loading: false };

  public render() {
    const { name } = this.state;
    return this.state.loading ? (
      <Loading />
    ) : (
      <MainContainer>
        <header>
          <h1>Welcome back, {name}</h1>
        </header>
      </MainContainer>
    );
  }

  public async componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    const client = coin();

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
