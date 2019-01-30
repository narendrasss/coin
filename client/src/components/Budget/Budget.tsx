import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Category, Transaction } from '../../types';

type Props = {
  categories: Category[];
  fixedExpenses: Transaction[];
};

class Budget extends React.Component<Props & RouteComponentProps, {}> {
  public render() {
    return <p>I am in the budget page.</p>;
  }
}

export default Budget;
