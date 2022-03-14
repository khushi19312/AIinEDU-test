const mongoose = require('mongoose');
const surveySchema = new mongoose.Schema({
    Class:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: true
    },
    RollNo:{
        type: String,
        required: true
    },
    L1:{
        type: String,
        required: true
    },
    L2:{
        type: String,
        required: true
    },
    L3:{
        type: String,
        required: true
    },
    L4:{
        type: String,
        required: true
    }
})
const Survey = mongoose.model('survey', surveySchema);
module.exports = Survey;