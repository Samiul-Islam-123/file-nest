const jwt = require('jsonwebtoken');

const generateToken = async(data) => {
    try{
        const token = await jwt.sign({data}, process.env.JWT_SECRET, {
            expiresIn : '1hr'
        })
    
        return token;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {generateToken};