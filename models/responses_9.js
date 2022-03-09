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
const Response_9 = mongoose.model('response_9', responseSchema);
module.exports = Response_9;