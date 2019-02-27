import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import MainContainer from '../MainContainer/MainContainer';
import { IUser, CoinError } from '../../../types';
import coin from '../../../client';
import Loading from '../Loading/Loading';
import { GoalTracker } from '../../general';
import style from './Dashboard.module.scss';
import { LinkButton } from '../../buttons';

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
    const { funds = 0, amount } = this.state.goal;
    return this.state.loading ? (
      <Loading />
    ) : (
      <MainContainer>
        <header>
          <div className={style.header}>
            <h1>${(amount - funds).toLocaleString()}</h1>
            <p>Left until you reach your goal!</p>
          </div>
          <GoalTracker funds={funds} amount={amount} />
          <LinkButton to="/budget" icon="angle-right">
            View my budget
          </LinkButton>
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
