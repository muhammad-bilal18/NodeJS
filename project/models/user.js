const Joi = require('joi');
const db = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new db.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    isAdmin: Boolean
});

userSchema.methods.genrateToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = db.model('User', userSchema);

function validateUser(User) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(7).max(30).required().email(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.boolean().required()
    });
    return schema.validate(User).error;
}

exports.User = User;
exports.validateUser = validateUser;