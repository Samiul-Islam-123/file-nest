const UserModel = require("../models/UserModel");
const sendEmail = require("../utils/Email");
const { generateToken } = require("../utils/JWT");
const { generateOTP } = require("../utils/OTP");
const HashPassword = require("../utils/PasswordHash");
const bcrypt = require('bcrypt')

const Signup = async (req, res) => {
    //Signup Logic

    const { username, email, password } = req.body;
    //check for preexisting user
    const ExistingUser = await UserModel.findOne({
        email: email
    });

    if (ExistingUser)
        return res.json({
            success: false,
            message: "User already exists with this email"
        })

    try {
        //secure password
        const securedPassword = await HashPassword(password);

        //generate OTP
        const otp = generateOTP();
        const securedOTP = await HashPassword(otp);
        console.log(otp, securedOTP)
        //create User Object
        const UserObj = new UserModel({
            username,
            email,
            password: securedPassword,
            otp: securedOTP
        });


        //save the user
        await UserObj.save();

        //send OTP to user's email for verification
        await sendEmail(
            email,
            "Welcome to " + process.env.APP_NAME + " - Verify Your Account",
            `Welcome to ${process.env.APP_NAME}! Your OTP is ${otp}. Use this code to verify your account and get started.`,
            `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #4CAF50;">Welcome to ${process.env.APP_NAME}!</h2>
      <p>Hi there,</p>
      <p>We're excited to have you on board! To get started, please verify your account using the OTP below:</p>
      <h3 style="color: #333; background: #f4f4f4; padding: 10px 20px; display: inline-block; border-radius: 5px;">
        ${otp}
      </h3>
      <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
      <p>If you have any questions or need help, feel free to reply to this email or visit our <a href="[Support Page URL]" style="color: #4CAF50;">support page</a>.</p>
      <p>Best regards,<br/>The ${process.env.APP_NAME} Team</p>
    </div>
  `
        );


        res.json({
            message: "An OTP has been send to " + email + " for verification",
            success: true,
            user: UserObj
        })
    }
    catch (error) {
        console.error(`Error during signup : ${error}`);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const Login = async (req, res) => {
    //Login logic

    const { email, password } = req.body;
    if (email && password) {
        try {
            //find the user using email
            const User = await UserModel.findOne({
                email: email
            });
            if (!User)
                return res.json({
                    message: "Wrong email. User not found",
                    success: false
                })

            //verify password
            if (await bcrypt.compare(password, User.password) === true) {
                //generate JWT token
                const token = await generateToken(User);
                return res.json({
                    message: "Logged in successfully",
                    success: true,
                    token: token
                })
            }

            else
                return res.json({
                    message: "Wrong password",
                    success: false
                })
        }
        catch (error) {
            console.error(`Error during Login : ${error}`);
        }
    }

    return res.json({
        message: "Email or password not provided. Please provide all fields",
        success: false
    })
}

const VerifyOTP = async (req, res) => {
    const { user_id, otp } = req.body;
    try {
        //find the user
        const User = await UserModel.findOne({
            _id: user_id
        });
        if (!User)
            return res.json({
                message: "User not found, Invalid User ID",
                success: false
            })

        if (await bcrypt.compare(otp, User.otp ? User.otp : "")) {
            ///generate jwt token
            const token = await generateToken(User);
            //update user data
            User.verified = true;
            User.otp = "";
            await User.save();

            //send email
            await sendEmail(
                email,
                "Welcome to " + process.env.APP_NAME + " - Account Verified Successfully!",
                `Congratulations! Your account on ${process.env.APP_NAME} has been verified. You now have full access to your account and can start securely storing and managing your files.`,
                `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #4CAF50;">Welcome to ${process.env.APP_NAME}!</h2>
                  <p>Hi ${username},</p>
                  <p>Congratulations! Your account has been successfully verified.</p>
                  <p>You now have full access to ${process.env.APP_NAME} and can take advantage of all our features to securely store, organize, and manage your files. Here’s what you can do:</p>
                  <ul>
                    <li><strong>Secure File Storage:</strong> Upload and store your files safely in the cloud with our top-notch security measures.</li>
                    <li><strong>Easy File Sharing:</strong> Share files and folders with your team, friends, or family with customizable permissions.</li>
                    <li><strong>Access Anywhere:</strong> Access your files from any device, anywhere in the world.</li>
                    <li><strong>Organized Folders:</strong> Keep your files tidy and easy to find with our folder management system.</li>
                    <li><strong>Large File Support:</strong> Upload and manage files of any size effortlessly.</li>
                  </ul>
                  <p>We’re committed to making file storage and management simple and secure for you.</p>
                  <p>If you have any questions or need assistance, our support team is here to help. Visit our <a href="[Support Page URL]" style="color: #4CAF50;">support page</a> or reply to this email.</p>
                  <p>We’re excited to have you onboard and can’t wait to see how ${process.env.APP_NAME} can help you manage your files!</p>
                  <p>Best regards,<br/>The ${process.env.APP_NAME} Team</p>
                </div>
                `
            );
            


            //send it to user
            return res.json({
                success: true,
                message: "Verified",
                token: token
            })
        }

        return res.json({
            message: "Invalid OTP",
            success: false
        })
    }
    catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

const ResetPassword = async (req, res) => {
    //Reset password logic
}

module.exports = { Signup, Login, ResetPassword, VerifyOTP }