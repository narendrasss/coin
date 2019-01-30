import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Category, Transaction, FixedExpense, User } from '../../types';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import Button from '../Button/Button';
import FixedExpenseList from './FixedExpenseList/FixedExpenseList';
import style from './Budget.module.scss';

type Props = {
  user: User;
  categories: Category[];
  fixedExpenses: FixedExpense[];
};

class Budget extends React.Component<Props & RouteComponentProps, {}> {
  public render() {
    return (
      <div className={style.container}>
        <h3>I would like to:</h3>
        <ButtonContainer>
          <Button to="/">Add new monthly expense</Button>
          <Button to="/">Modify my goal</Button>
          <Button to="/">Modify my income</Button>
        </ButtonContainer>
        <FixedExpenseList expenses={this.props.fixedExpenses} />
        <h3>Goal</h3>
      </div>
    );
  }
}

export default Budget;
