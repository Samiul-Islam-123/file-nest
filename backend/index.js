// main index.js

const express = require('express');
const app = express();
const cors = require('cors');
const ConnectToDatabase = require('./config/database.js');
const dotenv = require('dotenv');
const AuthRouter = require('./routes/AuthRoute.js');

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5500;

app.get('/', (req,res) => {
  res.send("Backend is running fine :)");
})

app.use('/auth', AuthRouter);

app.listen(PORT,async () => {
  await ConnectToDatabase(process.env.MONGODB_URL);
  console.log("Server is up and running on PORT : "+PORT);
})
