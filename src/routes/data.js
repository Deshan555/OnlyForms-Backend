const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

module.exports = (db) => {
  router.get('/', async (req, res) => {
    try {
      const data = await db.collection('templates').find().toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const result = await db.collection('templates').insertOne(req.body);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to insert data' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const result = await db.collection('templates').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update data' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const result = await db.collection('templates').deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete data' });
    }
  });

  return router;
};
