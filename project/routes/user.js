const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user')
const _ = require('lodash');
const debug = require('debug')('app:startup');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth')

router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort('name');
        res.send(users);
    }
    catch (error) {
        console.error(error.message);
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -_id -__v');
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
    }
});

router.post('/register', async (req, res) => {
    try {
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
    }
    catch (error) {
        console.error(error.message);
    }
});

module.exports = router;