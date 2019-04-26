function randomString(len, charSet) {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

const data = [
  {
    body: {
      email: 'user400@ikobit.com',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if NAME is missing'
  },
  {
    body: {
      name: 'User 400',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if EMAIL is missing'
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobit.com'
    },
    code: 400,
    message: 'should not CREATE an item if PASSWORD is missing'
  },
  {
    body: {
      name: 'Us',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if NAME length is less than the minimum'
  },
  {
    body: {
      name: 'User 400User 400User 400User 400User 400',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$'
    },
    code: 400,
    message:
      'should not CREATE an item if NAME length is greater than the maximum'
  },
  {
    body: {
      name: 'Us',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if NAME is not valid'
  },
  {
    body: {
      name: 'User 400',
      email: 'user400ikobit.com',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if EMAIL is not valid'
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$'
    },
    code: 400,
    message: 'should not CREATE an item if EMAIL is not valid'
  },
  {
    body: {
      name: 'User 400',
      email: randomString(70) + '@ikobit.com',
      password: 'User400Pa$$'
    },
    code: 400,
    message:
      'should not CREATE an item if EMAIL length is greater than the maximum'
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobitcom',
      password: '123'
    },
    code: 400,
    message:
      'should not CREATE an item if PASSWORD length is less than the minimum'
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobit.com',
      password: randomString(70)
    },
    code: 400,
    message:
      'should not CREATE an item if PASSWORD length is greater than the maximum'
  },
  {
    body: {
      prop: 'prop'
    },
    code: 400,
    message: 'should not CREATE an item when field/property is not allowed'
  },
  {
    body: {},
    code: 400,
    message: 'should not CREATE an empty item/object'
  },
  {
    body: {
      name: 'User 1',
      email: 'user1@ikobit.com',
      password: 'User1Pa$$'
    },
    code: 409,
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
