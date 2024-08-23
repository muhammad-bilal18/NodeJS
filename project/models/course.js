const db = require('mongoose');
const { authorSchema } = require('./author');

const Course = db.model('Course', new db.Schema({
    name: String,
    author: {
        type: db.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

const EmbeddedCourse = db.model('EmbeddedCourse', new db.Schema({
    name: String,
    author: authorSchema
}));



exports.Course = Course;
exports.EmbeddedCourse = EmbeddedCourse;