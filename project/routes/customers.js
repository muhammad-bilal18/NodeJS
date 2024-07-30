const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer')

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.render('Customers', {
            title: 'Vidly - Customers',
            data: customers
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const error = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        await customer.save();
        const customers = await Customer.find().sort('name');
        res.render('customers', {
            title: 'Vidly - Customers',
            data: customers
        });
    }
    catch (error) {
        console.error(error.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).send('Not Found');
        res.render('customers', {
            title: 'Vidly - Customers',
            data: [ customer ]
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).send('Not Found');
        const error = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        customer.name = req.body.name;
        customer.phone = req.body.name;
        customer.isGold = req.body.name;
        await customer.save();
        const customers = await Customer.find().sort('name');
        res.render('customers', {
            title: 'Vidly - Customers',
            data: customers
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete({ _id: req.params.id });
        if(!customer) return res.status(404).send('Not Found');
        const customers = await Customer.find().sort('name');
        res.render('customers', {
            title: 'Vidly - Customers',
            data: customers
        });
    }
    catch(error) {
        console.log(error.message);
    }
});

module.exports = router;