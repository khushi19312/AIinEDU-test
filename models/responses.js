const mongoose = require('mongoose');
const responseSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    RollNo:{
        type: String,
        required: true
    },
    QuesNo:{
        type: String,
        required: true
    },
    Answer:{
        type: String,
        required: true
    },
    Time:{
        type: String,
        required: true
    }
})
const Response = mongoose.model('response', responseSchema);
module.exports = Response;