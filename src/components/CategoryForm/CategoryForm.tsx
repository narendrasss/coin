import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import BackButton from '../BackButton/BackButton';
import ActionButton from '../ActionButton/ActionButton';
import style from './CategoryForm.module.scss';

class CategoryForm extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <main className={style.container}>
        <BackButton to="/categories" />
        <form>
          <h1 className={style.title}>New Category</h1>
          <label htmlFor="name">Category Name</label>
          <input id="name" className={style.input} style={{ marginBottom: '1.8rem' }} type="text" />
          <label htmlFor="budget">Category Budget</label>
          <input id="budget" className={style.input} type="text" />
        </form>
        <ActionButton
          onclick={() => {
            //TODO
            let a = 0;
          }}
        >
          Add new category
        </ActionButton>
      </main>
    );
  }
}

export default CategoryForm;
