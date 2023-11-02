const mongoose= require("mongoose");
const express= require("express")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Item = require('../models/itemModel');
const Transaction = require('../models/transactionModel');

// Items
// GET /items: Retrieve a list of all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().exec();
    res.json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// POST /items: Add a new item to the inventory
router.post('/', [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('quantity').isInt({ min: 0 }),
] , async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, quantity } = req.body;
  
  try {
    // Create and save the item
    const newItem = new Item({
      name,
      description,
      quantity,
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create a new item' });
  }
});

// GET /items/:id: Retrieve a specific item by its id
router.get('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId).exec();
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    res.status(500).json({ error: 'Failed to retrieve the item' });
  }
});

// PUT /items/:id: Update a specific item by its id
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, description, quantity } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(itemId, { name, description, quantity }, { new: true }).exec();
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json(item);
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update the item' });
  }
});

// DELETE /items/:id: Remove a specific item from the inventory
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findByIdAndDelete(itemId).exec();
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete the item' });
  }
});  


// Transactions
// POST /items/:id/transaction: Record a transaction for a specific item
router.post('/:id/transaction', [
  body('type').isIn(['IN', 'OUT']),
  body('quantity').isInt({ min: 0 }),
],async (req, res) => {
    const erros= validationResult(req);
    if(!erros.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }

    const itemId = req.params.id;
    const { type, quantity } = req.body;
  
    try {
      //Create and save the transaction
      const newTransaction = new Transaction({
        itemId,
        type,
        quantity,
      });
  
      const savedTransaction = await newTransaction.save();
      res.json(savedTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Failed to create a new transaction' });
    }
  });
  
  // GET /items/:id/transactions: Retrieve all transactions for a specific item
  router.get('/:id/transaction', async (req, res) => {
    const itemId = req.params.id;
    
    try {
      const transactions = await Transaction.find({ itemId }).exec();
      res.json(transactions);
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
  });

  module.exports = router