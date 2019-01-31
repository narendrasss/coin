import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import style from './FixedExpenseForm.module.scss';
import ActionButton from '../ActionButton/ActionButton';

type Props = {
  name: string;
  amount: string;
  onNameChange: React.ChangeEventHandler<HTMLInputElement>;
  onAmountChange: React.ChangeEventHandler<HTMLInputElement>;
  onDueChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
};

class FixedExpenseForm extends React.Component<Props & RouteComponentProps, {}> {
  render() {
    const { name, amount, onNameChange, onAmountChange, onDueChange, onSubmit } = this.props;
    return (
      <div className={style.container}>
        <form>
          <h1 className={style.title}>New Monthly Expense</h1>
          <label>
            What do you need to pay?
            <input className={style.input} value={name} type="text" onChange={onNameChange} />
          </label>
          <div className={style.inputWrapper}>
            <label style={{ flex: '3', marginRight: '1rem' }}>
              Amount
              <input
                className={style.input}
                value={amount}
                type="number"
                onChange={onAmountChange}
              />
            </label>
            <label style={{ flex: '2' }}>
              Due Date
              <input className={style.input} type="date" onChange={onDueChange} />
            </label>
          </div>
        </form>
        <ActionButton onclick={onSubmit}>Add new expense</ActionButton>
      </div>
    );
  }
}

export default FixedExpenseForm;
