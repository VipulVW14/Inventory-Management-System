const mongoose = require("mongoose");

// Define the schema for Item
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    quantity: { type: Number, required: true },
    lastUpdatedTimestamp: { type: Date, default: Date.now },
  });
  
module.exports= mongoose.model('Item', itemSchema);
