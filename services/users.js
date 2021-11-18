const User = require('../models/user');
const bcrypt = require('bcrypt');

const signUp = async (userData) => {
    try {
        const user = new User({
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            password: bcrypt.hashSync(userData.password, 10)
        })
        const document = await user.save();
        return {
            document
        }
    } catch (err) {
        // Otros errores por ejemplo email duplicado
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

const getUser = async (userEmail) => {
    try {
        const document = await User.findOne({userEmail});
        return {
            document
        }
    } catch (err) {
        // Otros errores por ejemplo email duplicado
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

module.exports = {
    signUp,
    getUser
}