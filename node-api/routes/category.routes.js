const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM category_master ORDER BY CategoryId DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { CategoryName } = req.body;
  await db.query('INSERT INTO category_master (CategoryName) VALUES (?)', [CategoryName]);
  res.json({ message: 'Category created' });
});

router.put('/:id', async (req, res) => {
  const { CategoryName } = req.body;
  await db.query('UPDATE category_master SET CategoryName=? WHERE CategoryId=?', [CategoryName, req.params.id]);
  res.json({ message: 'Category updated' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM category_master WHERE CategoryId=?', [req.params.id]);
  res.json({ message: 'Category deleted' });
});

module.exports = router;
