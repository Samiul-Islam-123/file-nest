const bcrypt = require('bcrypt');

//functions to generate, varify, otps

function generateOTP() {
    // Generate a random 6-digit number and pad with leading zeros if necessary
    return Math.floor(100000 + Math.random() * 900000).toString();
}
  
  
module.exports = {generateOTP}