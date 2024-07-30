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


async function updateCourse(id) {
    const course = await Course.findById(id);
    if(!course) return;
    course.auther = 'MD. Bilal';
    const result = await course.save();
    console.log(result);
}

async function _updateCourse(id) {
    await Course.updateOne(
        { _id: id },
        {   $set : {
                name: 'Deep Learning'
            } 
        }
    );
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('66a38f69972e8bc114dd1668');