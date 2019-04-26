const express = require('express');
const router = express.Router();

const service = require('../api/modules/auth/auth-service');

router.post('/signup', async (req, res) => {
  const result = await service.signup(req.body);
  res.status(200).send(result);
});

router.post('/login', async (req, res) => {
  const result = await service.login(req.body);
  if (result.code === 200)
    res
      .status(200)
      .header('x-auth-token', result.d.token)
      .send({ code: 200 });
  else res.status(200).send(result);
});

module.exports = router;
