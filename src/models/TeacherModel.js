const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        musicalInstrument: { type: String, required: true },
        experience: { type: Number, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        facebook: { type: String },
        intro: { type: String },
    },
    {
        timestamps: true,
    }
);
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;