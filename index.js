 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)

// Connect to MongoDB
 mongoose.connect('mongodb+srv://Vipul:Vipul123@cluster0.vth9opv.mongodb.net//', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Courses" });

// step 3: Heroku 
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/dist"));
    const path = require("path");
    // app.get("*", (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // })
}  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

