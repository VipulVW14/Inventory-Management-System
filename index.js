const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Inventory Management Server is running!")
})

const itemsRoutes = require('./src/routes/items');

app.use('/items', itemsRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vipulwasnik0:Vipul123@cluster0.boivexe.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'inventory' });

app.listen(3001, () => console.log('Server running on port 3001'));

 