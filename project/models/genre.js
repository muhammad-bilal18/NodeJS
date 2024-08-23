const db = require('mongoose');

const genreSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    }
})

const Genre = db.model('Genre', genreSchema);



exports.Genre = Genre;
exports.genreSchema = genreSchema;