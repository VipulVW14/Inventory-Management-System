const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { Item, Transaction } = require('./db'); // Import the Mongoose models
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Inverntory Management Server is running!")
})

// Items
// GET /items: Retrieve a list of all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find().exec();
    res.json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// POST /items: Add a new item to the inventory
app.post('/items', async (req, res) => {
  const { name, description, quantity } = req.body;
  
  if (!name || !description || !quantity) {
    return res.status(400).json({ error: 'Incomplete data provided' });
  }
  
  try {
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
app.get('/items/:id', async (req, res) => {
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
app.put('/items/:id', async (req, res) => {
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
app.delete('/items/:id', async (req, res) => {
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
app.post('/items/:id/transaction', async (req, res) => {
  const itemId = req.params.id;
  const { type, quantity } = req.body;

  try {
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
app.get('/items/:id/transaction', async (req, res) => {
  const itemId = req.params.id;
  
  try {
    const transactions = await Transaction.find({ itemId }).exec();
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://vipulwasnik0:Vipul123@cluster0.boivexe.mongodb', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "inventory" });

app.listen(3001, () => console.log('Server running on port 3001'));

 