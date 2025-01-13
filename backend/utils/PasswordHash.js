const bcrypt = require('bcrypt')

const HashPassword = async(originalPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(originalPassword, salt);
    return hashedPassword;
}

module.exports = HashPassword;