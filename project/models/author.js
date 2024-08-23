const db = require('mongoose');

const authorSchema = new db.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = db.model('Author', authorSchema);



exports.Author = Author;
exports.authorSchema = authorSchema;