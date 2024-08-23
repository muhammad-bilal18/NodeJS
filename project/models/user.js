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

exports.User = User;