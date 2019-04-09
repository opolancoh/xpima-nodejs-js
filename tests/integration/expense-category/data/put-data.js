const validData = [
  {
    newItem: {
      name: '  new name  '
    },
    message: `Code 200: should UPDATE an item changing the name to 'new name'`
  }
];

const invalidData = [
  {
    id: undefined,
    newItem: {},
    status: 'failure',
    code: 400,
    message: function() {
      return `Code ${this.code}: should not UPDATE an item with no fields`;
    }
  },
  {
    id: undefined,
    newItem: { prop: 'prop not valid' },
    status: 'failure',
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
    status: 'failure',
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
    status: 'failure',
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
