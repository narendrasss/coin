import { Response } from './types';

const data: Response = {
  user: {
    _id: 1,
    name: 'Narendra Syahrasyad',
    income: 2000,
    goal: {
      funds: 500,
      goal: 1500,
      payment: 250,
      due: new Date('August 2019')
    }
  },
  fixedExpenses: [
    {
      name: 'Car',
      amount: 250,
      due: new Date('1 August')
    },
    {
      name: 'Subscriptions',
      amount: 100,
      due: new Date('1 August')
    },
    {
      name: 'Phone Bill',
      amount: 75,
      due: new Date('1 August')
    }
  ],
  categories: [
    {
      name: 'Food',
      amount: 600
    },
    {
      name: 'Shopping',
      amount: 400
    }
  ]
};

export default data;
