const Split = require('split-grid');

Split({
    columnGutters: [{
        track: 1,
        element: document.querySelector('.gutter-col-1'),
    }, {
        track: 3,
        element: document.querySelector('.gutter-col-3'),
    }],
})