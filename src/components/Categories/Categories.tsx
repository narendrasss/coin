import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Category, FixedExpense } from '../../types';
import CategoryList from './CategoryList/CategoryList';
import LinkButton from '../LinkButton/LinkButton';
import BackButton from '../BackButton/BackButton';

type Props = {
  income?: number;
  fixedExpenses?: FixedExpense[];
  categories: Category[];
};

class Categories extends React.Component<Props & RouteComponentProps, {}> {
  render() {
    const { income, categories } = this.props;
    return (
      <main>
        <BackButton target="/" />
        <p>
          Transactions by <span>category</span>
        </p>
        <header>
          <h1>This month's remainder</h1>
          <p>${income ? income.toLocaleString() : 0}</p>
        </header>
        <p>Total budget ${income ? income.toLocaleString() : 0}</p>
        <CategoryList categories={categories} />
        <LinkButton icon="angle-right" to="/add-category">
          Add new category
        </LinkButton>
      </main>
    );
  }
}

export default Categories;
