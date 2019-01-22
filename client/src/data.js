const data = {
  user: {
    _id: 1,
    name: 'Narendra Syahrasyad',
    income: 2000
  },
  funds: 500,
  goal: 1500,
  budget: {
    total: 1000,
    categories: [
      {
        name: 'Food',
        amount: 600,
        spent: 15.25,
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
          }
        ]
      },
      {
        name: 'Shopping',
        amount: 400,
        spent: 50,
        transactions: [
          {
            _id: 3,
            vendor: 'Oak & Fort',
            amount: 50.0,
            date: '19-01-2019'
          }
        ]
      }
    ]
  }
};

export default data;
