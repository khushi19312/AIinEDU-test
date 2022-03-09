const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const port = process.env.PORT || 3000;

//---------db
const mongoose = require('mongoose')
const Response_8 = require('./models/responses_8')
const Response_9 = require('./models/responses_9')
const Response_10 = require('./models/responses_10')
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')
const mongoDB = "mongodb+srv://Khushi:AIinEdu_IP@cluster0.eqmkp.mongodb.net/quiz-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to mongo db...")
}).catch(err => console.log(err));

const fs = require('fs');
let data_8 = fs.readFileSync(path.join(__dirname, '/public/questions_8.json'));
let questions_8 = JSON.parse(data_8);

let data_9 = fs.readFileSync(path.join(__dirname, '/public/questions_9.json'));
let questions_9 = JSON.parse(data_9);

let data_10 = fs.readFileSync(path.join(__dirname, '/public/questions_10.json'));
let questions_10 = JSON.parse(data_10);


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
    res.render("details", { title: "Home" });
});

app.get("/class", (req, res) => {
    res.render("class", { title: "Home", Name: req.query.name, RollNo: req.query.rollno });
});


app.get("/questions_8", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_8", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_8[req.query.ques].ques, op: questions_8[req.query.ques].options, ans: questions_8[req.query.ques].ans });
    // 
});

app.get("/questions_9", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_9", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_9[req.query.ques].ques, op: questions_9[req.query.ques].options, ans: questions_9[req.query.ques].ans });
    // 
});

app.get("/questions_10", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_10", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_10[req.query.ques].ques, op: questions_10[req.query.ques].options, ans: questions_10[req.query.ques].ans });
    // 
});


app.get("/answer_8", (req, res) => {
    console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database
    const resp = new Response_8({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) res.redirect('/questions_8?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    else res.redirect('/confirmation');
    
});

app.get("/answer_9", (req, res) => {
    console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database
    const resp = new Response_9({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) res.redirect('/questions_9?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    else res.redirect('/confirmation');
    
});

app.get("/answer_10", (req, res) => {
    console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database
    const resp = new Response_10({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) res.redirect('/questions_10?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    else res.redirect('/confirmation');
    
});

app.post("/questions", (req, res) => {
    console.log(req.body.ques+" "+req.body.ans);
});

app.get("/confirmation", (req, res) => {
    res.render("confirmation", { title: "Confirmation"});
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});