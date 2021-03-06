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
const Survey = require('./models/survey')
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants')
const mongoDB = "mongodb+srv://Khushi:AIinEdu_IP@cluster0.eqmkp.mongodb.net/quiz-database?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected to mongo db...")
}).catch(err => console.log(err));

const fs = require('fs');
let data_8m = fs.readFileSync(path.join(__dirname, '/public/questions_8_maths.json'));
let questions_8m = JSON.parse(data_8m);

let data_9m = fs.readFileSync(path.join(__dirname, '/public/questions_9_maths.json'));
let questions_9m = JSON.parse(data_9m);

let data_10m = fs.readFileSync(path.join(__dirname, '/public/questions_10_maths.json'));
let questions_10m = JSON.parse(data_10m);

let data_8s = fs.readFileSync(path.join(__dirname, '/public/questions_8_science.json'));
let questions_8s = JSON.parse(data_8s);

let data_9s = fs.readFileSync(path.join(__dirname, '/public/questions_9_science.json'));
let questions_9s = JSON.parse(data_9s);

let data_10s = fs.readFileSync(path.join(__dirname, '/public/questions_10_science.json'));
let questions_10s = JSON.parse(data_10s);


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
    res.render("consent", { title: "Home" });
});

app.get("/details", (req, res) => {
    res.render("details", { title: "Details" });
});

app.get("/class", (req, res) => {
    res.render("class", { title: "Class", Name: req.query.name, RollNo: req.query.rollno });
});


app.get("/questions_8m", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_8", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_8m[req.query.ques].ques, op: questions_8m[req.query.ques].options, ans: questions_8m[req.query.ques].ans });
    // 
});

app.get("/questions_9m", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_9", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_9m[req.query.ques].ques, op: questions_9m[req.query.ques].options, ans: questions_9m[req.query.ques].ans });
    // 
});

app.get("/questions_10m", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_10", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_10m[req.query.ques].ques, op: questions_10m[req.query.ques].options, ans: questions_10m[req.query.ques].ans });
    // 
});

app.get("/questions_8s", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_8", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_8s[req.query.ques].ques, op: questions_8s[req.query.ques].options, ans: questions_8s[req.query.ques].ans });
    // 
});

app.get("/questions_9s", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_9", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_9s[req.query.ques].ques, op: questions_9s[req.query.ques].options, ans: questions_9s[req.query.ques].ans });
    // 
});

app.get("/questions_10s", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question_10", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions_10s[req.query.ques].ques, op: questions_10s[req.query.ques].options, ans: questions_10s[req.query.ques].ans });
    // 
});

app.get("/self-reporting_8", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database    
    res.render("self-reporting_8", {title: "Self-reporting", Question: req.query.ques, Answer: req.query.ans, Name: req.query.name, RollNo: req.query.rollno, Time: req.query.time});
});
app.get("/self-reporting_9", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database    
    res.render("self-reporting_9", {title: "Self-reporting", Question: req.query.ques, Answer: req.query.ans, Name: req.query.name, RollNo: req.query.rollno, Time: req.query.time});
});
app.get("/self-reporting_10", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database    
    res.render("self-reporting_10", {title: "Self-reporting", Question: req.query.ques, Answer: req.query.ans, Name: req.query.name, RollNo: req.query.rollno, Time: req.query.time});
});


app.get("/answer_8", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time+" "+req.query.sr1+" "+req.query.sr2+" "+req.query.sr3+" "+req.query.sr4);
    //write to database
    // const resp = new Response_8({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR1:req.query.sr1, SR2:req.query.sr2, SR3:req.query.sr3, SR4:req.query.sr4})
    const resp = new Response_8({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR3:req.query.sr3, SR4:req.query.sr4})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) {
        if(req.query.ques%2==0) res.redirect('/questions_8m?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
        else res.redirect('/questions_8s?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    }
    else res.redirect('/survey?class=8&name='+req.query.name+'&rollno='+req.query.rollno);
    
});

app.get("/answer_9", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database
    // const resp = new Response_9({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR1:req.query.sr1, SR2:req.query.sr2, SR3:req.query.sr3, SR4:req.query.sr4})
    const resp = new Response_9({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR3:req.query.sr3, SR4:req.query.sr4})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) {
        if(req.query.ques%2==0) res.redirect('/questions_9m?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
        else res.redirect('/questions_9s?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    }
    else res.redirect('/survey?class=9&name='+req.query.name+'&rollno='+req.query.rollno);
    
});

app.get("/answer_10", (req, res) => {
    // console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    //write to database
    // const resp = new Response_10({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR1:req.query.sr1, SR2:req.query.sr2, SR3:req.query.sr3, SR4:req.query.sr4})
    const resp = new Response_10({Name:req.query.name, RollNo:req.query.rollno, QuesNo:req.query.ques-1, Answer:req.query.ans, Time:req.query.time, SR3:req.query.sr3, SR4:req.query.sr4})
    resp.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })    
    if(req.query.ques<16) {
        if(req.query.ques%2==0) res.redirect('/questions_10m?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
        else res.redirect('/questions_10s?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    }
    else res.redirect('/survey?class=10&name='+req.query.name+'&rollno='+req.query.rollno);
    
});

app.post("/questions", (req, res) => {
    console.log(req.body.ques+" "+req.body.ans);
});

app.get("/survey", (req, res) => {
    res.render("survey", { title: "Survey", Name: req.query.name, RollNo: req.query.rollno, Class: req.query.class});
});

app.get("/confirmation", (req, res) => {
    const sur = new Survey({Class: req.query.class, Name:req.query.name, RollNo:req.query.rollno, L1:req.query.l1, L2:req.query.l2, L3:req.query.l3, L4:req.query.l4})
    sur.save().then(()=>{
    }).catch((err)=>{
        throw err;
    })
    res.render("confirmation", { title: "Confirmation"});
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});