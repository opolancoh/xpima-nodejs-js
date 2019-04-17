const validData = [
  {
    message: `Status 200: should DELETE an item given the id`
  }
];

const invalidData = [
  {
    id: 'abc123',
    newItem: {},
    status: 400,
    message: function() {
      return `Status ${this.status}: should not DELETE an item when ID '${
        this.id
      }' is not valid`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    newItem: { name: '  new name 2  ' },
    status: 404,
    message: function() {
      return `Status ${this.status}: should not DELETE an item when ID '${
        this.id
      }' is valid' but not exists on DB`;
    }
  }
];

module.exports = {
  validData,
  invalidData
};
