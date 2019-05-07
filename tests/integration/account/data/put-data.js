const validData = [
  {
    newItem: {
      name: 'new name'
    },
    message: `Code 200: should UPDATE an item changing the name to 'new name'`
  },
  {
    newItem: {
      type: 'creditCard'
    },
    message: `Code 200: should UPDATE an item changing the type to 'creditCard'`
  },
  {
    newItem: {
      description: 'Description was updated'
    },
    message: `Code 200: should UPDATE an item changing the description to 'Description was updated'`
  }
];

const invalidData = [
  {
    id: '5c6e36b17a76dd1f30c17be1',
    newItem: {
      totalRevenue: 1000
    },
    code: 400,
    message: function() {
      return `Code ${
        this.code
      }: should not UPDATE an item where 'totalRevenue' field is present.`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    newItem: {
      totalExpenses: 1000
    },
    code: 400,
    message: function() {
      return `Code ${
        this.code
      }: should not UPDATE an item where 'totalExpenses' field is present.`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    newItem: {
      balance: 1000
    },
    code: 400,
    message: function() {
      return `Code ${
        this.code
      }: should not UPDATE an item where 'balance' field is present.`;
    }
  },
  {
    id: undefined,
    newItem: {},
    code: 400,
    message: function() {
      return `Code ${this.code}: should not UPDATE an item with no fields`;
    }
  },
  {
    id: undefined,
    newItem: { prop: 'prop not valid' },
    code: 400,
    message: function() {
      return `Code ${
        this.code
      }: should not UPDATE an item when a column is not valid`;
    }
  },
  {
    id: 'abc123',
    newItem: {},
    code: 400,
    message: function() {
      return `Code ${this.code}: should not UPDATE an item when ID '${
        this.id
      }' is not valid`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    newItem: { name: '  new name 2  ' },
    code: 404,
    message: function() {
      return `Code ${this.code}: should not UPDATE an item when ID '${
        this.id
      }' is valid' but not exists on DB`;
    }
  }
];

module.exports = {
  validData,
  invalidData
};
