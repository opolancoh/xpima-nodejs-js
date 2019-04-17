const validData = require('./get-select-data');

const invalidData = [
  {
    id: '123456',
    status: 400,
    message: function() {
      return `Status ${this.status}: should not GET an item when ID '${
        this.id
      }' is not valid' `;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    status: 404,
    message: function() {
      return `Status ${this.status}: should not GET an item when ID '${
        this.id
      }' is valid' but not exists on DB`;
    }
  }
];

module.exports = {
  validData,
  invalidData
};