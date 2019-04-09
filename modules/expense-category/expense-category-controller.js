const express = require('express');

const service = require('./expense-category-service');

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    try {
        // try to find items
        const result = await service.find(req);
        res.status(200).send(result);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(200).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error.',
        });
    }
});
// Get by Id
router.get('/:id', async (req, res) => {
    try {
        // try to find an item
        const result = await service.findById(req.params.id, req.query);
        res.status(200).send(result);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(200).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error.',
        });
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        // try to create a new item
        const result = await service.create(req.body);
        res.status(200).send(result);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(200).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error.',
        });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        // try to update an existing item
        const result = await service.update(req.params.id, req.body);
        res.status(200).send(result);
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        res.status(200).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error.',
        });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        // try to delete an item
        const result = await service.delete(req.params.id);
        res.status(200).send(result);
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        res.status(200).send({
            status: 'error',
            code: 500,
            message: 'Internal Server Error.',
        });
    }
});

module.exports = router;