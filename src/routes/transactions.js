const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/transactionModel');

// Transactions
// POST /items/:id/transaction: Record a transaction for a specific item
router.post('/items/:id/transaction', [
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
  router.get('/items/:id/transaction', async (req, res) => {
    const itemId = req.params.id;
    
    try {
      const transactions = await Transaction.find({ itemId }).exec();
      res.json(transactions);
    } catch (error) {
      console.error('Error retrieving transactions:', error);
      res.status(500).json({ error: 'Failed to retrieve transactions' });
    }
  });

  module.exports= router