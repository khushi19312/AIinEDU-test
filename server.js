const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const port = process.env.PORT || 3000;

const fs = require('fs');
let data = fs.readFileSync(path.join(__dirname, '/public/questions.json'));
let questions = JSON.parse(data);
// console.log(questions[1]);

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
    res.render("details", { title: "Home" });
});

app.get("/questions", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    res.render("question", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions[req.query.ques].ques, op: questions[req.query.ques].options, ans: questions[req.query.ques].ans });
    // 
});

app.get("/answer", (req, res) => {
    console.log(req.query.ques-1+" "+req.query.ans+" "+req.query.time);
    // res.send(req.query.name+" "+req.query.rollno);
    // res.json(questions[req.query.ques]);
    if(req.query.ques<16) res.redirect('/questions?ques='+req.query.ques+'&name='+req.query.name+'&rollno='+req.query.rollno);
    else res.redirect('/confirmation');
    // res.render("question", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno, q: questions[req.query.ques].ques, op: questions[req.query.ques].options, ans: questions[req.query.ques].ans });
    // 
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