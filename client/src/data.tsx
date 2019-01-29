const data = {
  _id: 1,
  name: 'Narendra Syahrasyad',
  income: 2000,
  funds: 500,
  goal: 1500,
  fixedExpenses: [
    {
      name: 'Car',
      amount: 250
    }
  ],
  categories: [
    {
      name: 'Food',
      amount: 600,
      transactions: [
        {
          _id: 1,
          vendor: 'Starbucks',
          amount: 5.25,
          date: '22-01-2019'
        },
        {
          _id: 2,
          vendor: 'Tim Hortons',
          amount: 10.0,
          date: '19-01-2019'
        },
        {
          _id: 3,
          vendor: 'Tim Hortons',
          amount: 10.0,
          date: '19-01-2019'
        }
      ]
    },
    {
      name: 'Shopping',
      amount: 400,
      transactions: [
        {
          _id: 4,
          vendor: 'Oak & Fort',
          amount: 50.0,
          date: '19-01-2019'
        }
      ]
    }
  ]
};

export default data;
