const express = require('express');
const router = express.Router();
const { User } = require('../models/user')
const { validateUser } = require('../validation/user')
const _ = require('lodash');
const debug = require('debug')('app:startup');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth')

router.get('/', async (req, res) => {
    const users = await Use.find().sort('name');
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -_id -__v');
    res.send(user);
});

router.post('/register', async (req, res) => {
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already exist.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    const token = user.genrateToken();
    if(result) return res.status(200).header("x-auth-token", token).send('Registered successfully.')
    else return res.status(500).send('Something went wrong.')
});

module.exports = router;