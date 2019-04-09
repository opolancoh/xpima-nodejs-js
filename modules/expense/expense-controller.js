const express = require('express');

const service = require('./expense-service');

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
    try {
        // try to find items
        const result = await service.find(req.query);
        if (result.status === 'success')
            res.status(200).send(result.response);
        else
            res.status(500).send(result.response);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(500).send({
            message: 'Internal Server Error.',
        });
    }
});
// Get by Id
router.get('/:id', async (req, res) => {
    try {
        // try to find an item
        const result = await service.findById(req.params.id);
        if (result.status === 'success')
            res.status(200).send(result.response);
        else if (result.status === 'item-not-valid')
            res.status(400).send(result.response);
        else if (result.status === 'not-found')
            res.status(404).send(result.response);
        else
            res.status(500).send(result.response);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(500).send({
            message: 'Internal Server Error.',
        });
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        // try to create a new item
        const result = await service.create(req.body);
        if (result.status === 'success')
            res.status(201).send(result.response);
        else if (result.status === 'item-not-valid')
            res.status(400).send(result.response);
        else if (result.status === 'item-found')
            res.status(409).send(result.response);
        else
            res.status(500).send(result.response);
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        res.status(500).send({
            message: 'Internal server error.',
        });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        // try to update an existing item
        const result = await service.update(req.params.id, req.body);
        if (result.status === 'success')
            res.status(200).send(result.response);
        else if (result.status === 'item-not-valid')
            res.status(400).send(result.response);
        else if (result.status === 'not-found')
            res.status(404).send(result.response);
        else
            res.status(500).send(result.response);
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        res.status(500).send({
            message: 'Internal Server Error.',
        });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        // try to delete an item
        const result = await service.delete(req.params.id);
        if (result.status === 'success')
            res.status(200).send(result.response);
        else if (result.status === 'item-not-valid')
            res.status(400).send(result.response);
        else if (result.status === 'not-found')
            res.status(404).send(result.response);
        else
            res.status(500).send(result.response);
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        res.status(500).send({
            message: 'Internal Server Error.',
        });
    }
});

module.exports = router;