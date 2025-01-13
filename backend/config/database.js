const mongoose = require("mongoose");

const ConnectToDatabase = async(URL) =>{
  
  try{
  console.log("Connecting to MongoDB...");
  await mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
  }
  catch(error){
    throw error;
  }
}

module.exports = ConnectToDatabase;
