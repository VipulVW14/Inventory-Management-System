// itemModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Item = mongoose.model<IItem>('Item', ItemSchema);

export default Item;
