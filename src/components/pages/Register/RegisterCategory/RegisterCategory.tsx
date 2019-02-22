import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from '../Register.module.scss';
import localStyle from './RegisterCategory.module.scss';
import { LinkButton, BackButton } from '../../../buttons';
import { Category } from '../../../../types';
import { NameAmountInput } from '../../../form';
import { CATEGORY_OPTIONS } from '../../../../utils/constants';
import CategoryCard from './CategoryCard/CategoryCard';
import { Tip } from '../../../general';

type Props = {
  categories: Category[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  onAdd: React.MouseEventHandler;
  onDel: (e: React.MouseEvent, name: string) => void;
};

const RegisterCategory: React.FC<Props & RouteComponentProps> = ({
  categories,
  onChange,
  onAdd,
  onDel
}) => {
  return (
    <main className={style.container}>
      <BackButton to="/register/income" />
      <header className={style.header}>
        <h1>Create an Account</h1>
        <p className={style.subtitle}>Step 3 of 4 &mdash; Categories</p>
        <p className={style.text}>Last one - we promise!</p>
      </header>
      <form className={style.form}>
        <p>What categories would you like to include in your budget?</p>
        <div className={localStyle.cards}>
          {CATEGORY_OPTIONS.map((name, index) => (
            <CategoryCard
              key={['cc', index].join('')}
              name={name}
              index={index}
              onAdd={onAdd}
              onDel={onDel}
            />
          ))}
        </div>
        <div>
          {categories.map(({ name, amount }, index) => (
            <NameAmountInput
              key={['ctg', index].join('')}
              title={['category', 'budget']}
              name={name}
              amount={amount}
              index={index}
              handler={onChange}
              onDelete={onDel}
            />
          ))}
        </div>
        <Tip>
          We recommend having a maximum of 5 categories so you can focus on what's important.
        </Tip>
      </form>
      <LinkButton
        to="./income"
        icon="arrow-right"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
    </main>
  );
};

export default RegisterCategory;
