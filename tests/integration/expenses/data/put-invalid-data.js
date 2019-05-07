const invalidDataFromPost = require('./post-invalid-data');

const invalidData = [
  ...invalidDataFromPost,
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { amount: 654321 },
    code: 404,
    message: function() {
      return `should not UPDATE an item when ID '${
        this.id
      }' is valid but not exists on DB`;
    }
  },
  {
    id: '123',
    body: { amount: 654321 },
    code: 400,
    message: function() {
      return `should not UPDATE an item when ID '${this.id}' is not valid`;
    }
  }
];

invalidData.forEach(element => {
  const msg = element.message();
  element.message = msg.replace('CREATE', 'UPDATE');
});

module.exports = invalidData;
