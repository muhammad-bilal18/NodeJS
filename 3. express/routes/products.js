const express = require('express');
const router = express.Router();

let products = [
    { id: 1, name: 'bat' },
    { id: 2, name: 'ball' },
    { id: 3, name: 'shirt'}
];

router.get('/', (req, res) => {
    res.send(products);
});

router.get('/:id', (req, res) => {
    const prod = products.find(p => p.id === parseInt(req.params.id));
    if(!prod) return res.status(404).send('not found');
    else res.send(prod);
});

router.post('/', (req, res) => {
    const error = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const prod = {
        id: products.length + 1,
        name: req.body.name
    };

    products.push(prod);
    res.send(prod);
});

router.put('/:id', (req, res) => {
    const prod = products.find(p => p.id === parseInt(req.params.id));
    if(!prod) return res.status(404).send('not found');

    const error = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    prod.name = req.body.name;
    res.send(prod);
});

router.delete('/:id', (req, res) => {
    const prod = products.find(p => p.id === parseInt(req.params.id));
    if(!prod) return res.status(404).send('not found');

    const index = products.indexOf(prod);
    products.splice(index, 1);

    res.send(prod);
});

function validateProduct(prod) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(prod).error;
}

module.exports = router;