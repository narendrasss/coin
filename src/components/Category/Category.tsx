import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import BackButton from '../BackButton/BackButton';
import { Category } from '../../types';

type Props = {
  categoryName?: string;
  onMount: (name: string) => Category | undefined;
};

class CategoryPage extends React.Component<Props & RouteComponentProps, {}> {
  render() {
    return (
      <main className="container">
        <BackButton target="/categories" />
        <p>
          Transactions by <span>category</span>
        </p>
        <header>
          <div>
            <p>Eating out</p>
            <p>Budget remainder</p>
          </div>
        </header>
        <p>Total budget</p>
      </main>
    );
  }
}

export default CategoryPage;
