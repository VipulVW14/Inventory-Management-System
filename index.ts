import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import itemsRoutes from './src/routes/items';
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Inventory Management Server is running!');
});



app.use('/items', itemsRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vipulwasnik0:Vipul123@cluster0.boivexe.mongodb.net/', {dbName: 'inventory'});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}`));
