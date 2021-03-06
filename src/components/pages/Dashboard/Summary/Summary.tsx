import React, { FC } from 'react';
import moment from 'moment';
import { ICategory, CoinError } from '../../../../types';
import { Spinner, PieChart } from '../../../general';
import style from './Summary.module.scss';
import CategoryList from './CategoryList/CategoryList';
import { LinkButton } from '../../../buttons';

type Props = {
  categories: ICategory[];
  loading: boolean;
  errors?: CoinError;
};

const Summary: FC<Props> = ({ categories, loading, errors }) => {
  const budget = categories.reduce((acc, ctg) => acc + ctg.budget, 0);
  const totalSpent = categories.reduce((acc, ctg) => acc + ctg.spent, 0);

  return (
    <section className={style.container}>
      {(() => {
        if (loading) return <Spinner size="lg" />;
        if (errors) return <p>{errors.message}</p>;
        return (
          <>
            <header className={style.header}>
              <p className={style.date}>{moment().format('MMMM DD, YYYY')}</p>
              <div className={style.remainder}>
                <h2>${budget - totalSpent}</h2>
                <p className={style.remainderCaption}>Left to spend</p>
              </div>
            </header>
            <PieChart style={{ marginBottom: '2rem' }} outerRadius="16rem" innerRadius="10rem">
              <h1 className={style.remainder}>${totalSpent.toLocaleString()}</h1>
              <p className={style.remainderCaption}>Spent</p>
            </PieChart>
            <CategoryList categories={categories} />
            <footer className={style.footer}>
              <LinkButton to="/categories">See all categories</LinkButton>
              <LinkButton to="/new-expense">Add new expense</LinkButton>
            </footer>
          </>
        );
      })()}
    </section>
  );
};

export default Summary;
