import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { ICategory, IFixedExpense, IUser, CoinError } from '../../../types';
import { LinkButton, BackButton } from '../../buttons';
import FixedExpenseList from './FixedExpenseList/FixedExpenseList';
import style from './Budget.module.scss';
import { PieChart, GoalTracker } from '../../general';
import Moment from 'moment';
import MainContainer from '../MainContainer/MainContainer';
import Loading from '../Loading/Loading';
import coin from '../../../client';

const client = coin();

type State = {
  user: IUser;
  categories: ICategory[];
  fixedExpenses: IFixedExpense[];
  loading: boolean;
  errors?: CoinError;
};

class Budget extends React.Component<RouteComponentProps, {}> {
  state = {
    user: {} as IUser,
    categories: [] as ICategory[],
    fixedExpenses: [] as IFixedExpense[],
    loading: true
  } as State;

  public render() {
    if (this.state.loading) return <Loading />;
    const { income } = this.state.user;
    const { funds, amount, due } = this.state.user.goal;
    return (
      <MainContainer>
        <BackButton to="/" />
        <header className={style.header}>
          <h1 style={{ fontWeight: 'normal' }}>My Budget</h1>
          <div className={style.budgetInfo}>
            <p className={style.budget}>${(income - this._getExpenseTotal()).toLocaleString()}</p>
            <p className={style.incomeCaption}>Available to spend</p>
          </div>
        </header>
        <div className={style.info}>
          <PieChart outerRadius="16rem" innerRadius="9rem">
            <h1 className={style.income}>${income.toLocaleString()}</h1>
            <p className={style.incomeCaption}>Total Income</p>
          </PieChart>
        </div>
        <h3 className={style.subtitle}>I would like to:</h3>
        <div>
          <LinkButton
            icon="angle-right"
            style={{ marginBottom: '0.5rem' }}
            to="/new-monthly-expense"
          >
            Add new monthly expense
          </LinkButton>
          <div className={style.btnContainer}>
            <LinkButton icon="angle-right" to="/">
              Modify my goal
            </LinkButton>
            <LinkButton icon="angle-right" to="/">
              Modify my income
            </LinkButton>
          </div>
        </div>
        <h3 style={{ marginBottom: 0 }} className={style.subtitle}>
          Fixed expenses
        </h3>
        <FixedExpenseList expenses={this.state.fixedExpenses} />
        <h3 className={style.subtitle}>Goal</h3>
        <div className={style.goal}>
          <p className={style.goalTitle}>Savings</p>
          <p className={style.goalDue}>Due: {Moment(due).format('MMMM YYYY')}</p>
        </div>
        <GoalTracker funds={funds!} amount={amount!} />
      </MainContainer>
    );
  }

  public async componentDidMount() {
    await this.setState({ loading: true });
    try {
      const user = await client.user.me();
      const categories = await client.category.getAll();
      const expenses = await client.fixedExpenses.getAll();
      this.setState({
        loading: false,
        user: user.data,
        categories: categories.data,
        fixedExpenses: expenses.data
      });
    } catch (err) {
      this.setState({ loading: false, errors: err });
    }
  }

  private _getExpenseTotal() {
    const { fixedExpenses } = this.state;
    return fixedExpenses.reduce((acc, fe) => acc + fe.amount, 0);
  }
}

export default Budget;
