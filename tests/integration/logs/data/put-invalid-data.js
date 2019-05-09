const invalidData = [
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: {},
    code: 404,
    message: function() {
      return `should not UPDATE an item because the endpoint not exists`;
    }
  },
  {
    id: '',
    body: {},
    code: 404,
    message: function() {
      return `should not UPDATE an item because the endpoint not exists`;
    }
  }
];

module.exports = invalidData;
