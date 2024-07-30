const { default: mongoose } = require('mongoose');
const db = require('mongoose');

db.connect('mongodb://localhost/mongo-exercises').then(() => {
    console.log('connected to database');
}).catch(err => {
    console.log('Error:', err);
});

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now },
    name: String,
    auther: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    const courses = await Course.find({ 
        isPublished: true,
    })
    .or([
        { price: { $gte: 15 } },
        { name: /.*by.*/i, }
    ])

    console.log(courses);
}


getCourses();
