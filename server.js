const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/")));

app.get("/", (req, res) => {
    res.render("details", { title: "Home" });
});

app.get("/questions", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    res.render("question", { title: "Questionnaire", Question: req.query.ques, Name: req.query.name, RollNo: req.query.rollno });
});

app.get("/confirmation", (req, res) => {
    // res.send(req.query.name+" "+req.query.rollno);
    res.render("confirmation", { title: "Confirmation"});
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});