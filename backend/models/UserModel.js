const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    verified : {
        type : Boolean,
        default : false
    },
    otp : {
        value : String,
        expTime : {
            type : Date
        }
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})

const UserModel = new mongoose.model('users', UserSchema);
module.exports = UserModel;