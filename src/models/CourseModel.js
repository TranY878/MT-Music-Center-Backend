const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        subject: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        level: { type: Number }
    },
    {
        timestamps: true,
    }
);
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;