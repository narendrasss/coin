import React, { FC, ChangeEventHandler } from 'react';
import { DropDown } from '../../../form';
import { CoinError, PeriodOptions } from '../../../../types';
import { Spinner } from '../../../general';
import style from './ExpenseCalculator.module.scss';
import { LinkButton } from '../../../buttons';
import { Error } from '../../../errors';

type Props = {
  vendor: string;
  period: string;
  options: string[];
  periodOptions: PeriodOptions[];
  result: number;
  onVendorChange: ChangeEventHandler<HTMLSelectElement>;
  onPeriodChange: ChangeEventHandler<HTMLSelectElement>;
  loading: boolean;
  errors?: CoinError;
};

const ExpenseCalculator: FC<Props> = ({
  vendor,
  period,
  options,
  periodOptions,
  result,
  onVendorChange,
  onPeriodChange,
  loading,
  errors
}) => {
  return (
    <section className={style.container}>
      <h1 className={style.title}>How much did I spend on:</h1>
      <div className={style.calculator}>
        <form className={style.form}>
          <DropDown name={vendor} options={options} onChange={onVendorChange} />
          <DropDown name={period} options={periodOptions} onChange={onPeriodChange} />
        </form>
        <div className={style.result}>{loading ? <Spinner /> : <h1>${result.toFixed(2)}</h1>}</div>
      </div>
      {errors ? <Error>{errors.message}</Error> : null}
      <LinkButton to="/">See all</LinkButton>
    </section>
  );
};

export default ExpenseCalculator;
