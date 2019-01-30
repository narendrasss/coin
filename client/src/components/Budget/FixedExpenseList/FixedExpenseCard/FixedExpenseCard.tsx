import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FixedExpense } from '../../../../types';
import Button from '../../../Button/Button';
import style from './FixedExpenseCard.module.scss';

type Props = {
  expense: FixedExpense;
};

type State = {
  isOpen: boolean;
};

class FixedExpenseCard extends React.Component<Props, State> {
  state = {
    isOpen: false
  };

  handleClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { name, amount, due } = this.props.expense;
    const { isOpen } = this.state;
    return (
      <div onClick={this.handleClick} className={style.container}>
        <div className={style.about}>
          <div className={style.basic}>
            <p>{name}</p>
            <p>{amount.toLocaleString('en', { style: 'currency', currency: 'USD' })}</p>
          </div>
          {isOpen ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-right" />}
        </div>
        {isOpen ? (
          <div className={style.info}>
            <div className={style.info__about}>
              <p>Due in: {due}</p>
            </div>
            <div className={style.info__btn}>
              <Button to="/">Modify expense</Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FixedExpenseCard;
