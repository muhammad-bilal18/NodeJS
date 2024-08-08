const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "Vidly - Home Page",
        message: "Welcome to Vidly, Home of all your Favourites ...",
    })
});

module.exports = router;