import mongoose, { Document, Schema } from 'mongoose';

interface Transaction extends Document {
  itemId: mongoose.Types.ObjectId;
  type: 'IN' | 'OUT';
  quantity: number;
  transactionTimestamp: Date;
}

const transactionSchema: Schema = new Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  type: { type: String, enum: ['IN', 'OUT'], required: true },
  quantity: { type: Number, required: true },
  transactionTimestamp: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<Transaction>('Transaction', transactionSchema);

export default Transaction;
