const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/Email");
const { generateToken } = require("../utils/JWT");
const HashPassword = require("../utils/PasswordHash");

const Signup = async (req,res) => {
    //Signup Logic
    
    const {username, email, password} = req.body;
    //check for preexisting user
    const ExistingUser =await UserModel.findOne({
        email : email
    });

    if(ExistingUser)
        return res.json({
            success : false,
            message : "User already exists with this email"
        })

    //secure password
    const securedPassword = await HashPassword(password);

    //create User Object
    const UserObj = new UserModel({
        username,
        email,
        password
    });
    

    //save the user
    //await UserObj.save();

    await sendEmail(email, "Sample Subject", " this is Sample Body", `
        <p1>Sample Paragraph</p1>
        `)

    //verify user email
    //coming soon :)   
}

const Login = async(req,res) => {
    //Login logic
}

const ResetPassword = async(req,res) => {
    //Reset password logic
}

module.exports ={Signup, Login, ResetPassword}