const express = require('express');
const router = express.Router();

const service = require('../api/modules/expense-category/service');

// Get all
router.get('/', async (req, res) => {
  // try to find items
  const result = await service.find(req);
  res.status(200).send(result);
});
// Get by Id
router.get('/:id', async (req, res) => {
  // try to find an item
  const result = await service.findById(req.params.id, req.query);
  res.status(200).send(result);
});

// Create
router.post('/', async (req, res) => {
  // try to create a new item
  const result = await service.create(req.body);
  res.status(200).send(result);
});

// Update
router.put('/:id', async (req, res) => {
  // try to update an existing item
  const result = await service.update(req.params.id, req.body);
  res.status(200).send(result);
});

// Delete
router.delete('/:id', async (req, res) => {
  // try to delete an item
  const result = await service.delete(req.params.id);
  res.status(200).send(result);
});

module.exports = router;
