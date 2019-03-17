import React from 'react';
import moment from 'moment';
import { ITransaction } from '../../../types';
import style from './TransactionList.module.scss';

type Props = {
  transactions: ITransaction[];
};

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <ul className={style.wrapper}>
      {transactions.map(tr => (
        <li className={style.item}>
          <div className={style.info}>
            <p className={style.vendor}>{tr.vendor}</p>
            <p>${tr.amount}</p>
          </div>
          <p className={style.date}>{moment(tr.date).format('MMM DD, YYYY')}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
