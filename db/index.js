const mongoose = require("mongoose");

// Define the schema for Item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true },
  lastUpdatedTimestamp: { type: Date, default: Date.now },
});

// Define the schema for Transaction
const transactionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  type: { type: String, enum: ['IN', 'OUT'], required: true },
  quantity: { type: Number, required: true },
  transactionTimestamp: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
  const Transaction = mongoose.model('Transaction', transactionSchema)

  module.exports={
    Item, 
    Transaction
}

  