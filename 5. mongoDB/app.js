const { default: mongoose } = require('mongoose');
const db = require('mongoose');

db.connect('mongodb://localhost/myDB')
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log('Error:', err);
    });

const courseSchema = new mongoose.Schema({
    name: String,
    auther: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "React JS Course",
        auther: "Bilal",
        tags: [ "front end", "react" ],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find({ auther: "Bilal" });
    console.log(courses);
}

getCourses();