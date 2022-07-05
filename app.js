const express = require('express');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
// const User = require("./models/user");

const mongoose = require('mongoose');
// const { stringify } = require('querystring');
// const { isSet } = require('util/types');

// const { body, validationResult } = require('express-validator');
// const { Session } = require('inspector');
// const popup = require('popups');
const app = express();
const port = process.env.PORT || 8000;

//serving static files   
app.use('/static', express.static('static'));            //for  serving static files (images,css,js etc)
app.use(express.urlencoded());                          // to get form data

// PUG RELATED CODE(template engine)
app.set('view engine', 'pug');                          // (engine to view template files)
app.set('views', path.join(__dirname, 'views'));        //(path from where u want to view the template files)

// Endpoints
app.get("/", (req, res) => {
    res.status(200).render('login');
});
app.get("/register", (req, res) => {
    res.status(200).render("register");
})
app.get("/home", (req, res) => {
    res.status(200).render("home");
})
app.get("/about", (req, res) => {
    res.status(200).render('about');
});
app.get("/services", (req, res) => {
    res.status(200).render('services');
});
app.get("/contact", (req, res) => {
    res.status(200).render('contact');
});

// get form data
// app.post("/",(req,res)=>{
//     var name = req.body.name;
//     var email = req.body.email;
//     var password = req.body.password;
//     let form_data = req.body;
//     console.log(form_data);
// });

// var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'student'
// });
// conn.connect(function(err){
//     if(err) throw err;
//     console.log('connected to database');

// register
// app.post("/register", (req, res) => {
//     var name = req.body.name;
//     var email = req.body.email;
//     var password = req.body.password;
// let form_data = req.body;
// console.log(form_data);            // all form data
// console.log(name)

//     var sql = "SELECT * FROM register";
//     conn.query(sql, function (err, result) {
//         if (err) throw err;
//     })
//     var sql = "INSERT INTO register(id, name, email, password) VALUES( ' ', '" + name + "','" + email + "','" + password + "')";
//     conn.query(sql, function (err, result) {
//         if (err) throw err;
//         res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='/'>login</a></div><br><br><div align='center'><a href='/register'>Register another user</a></div>");
//         // res.status(200).render('login');
//         // console.log('inserted data');
//     });
// });

// login
app.post("/", (req, res) => {
    let username = req.body.email;
    let password = req.body.password;
    console.log(username + " " + password);
});
// });



// run/start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// mongoose-------------------->>
// connect to db
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test', {usenewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.connect('mongodb://localhost:27017/student_db');

// var db = mongoose.connecttion;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//     console.log('connected');
// })
if (conn) {
    console.log('connected');
}
// ---------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------
// DEFINE schema-->>
const kittySchema = new mongoose.Schema({
    name: String,
});

// METHODS IN SCHEMA
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
    const greeting = "My name is:- " + this.name;
    console.log(greeting);
};

// Compile SCHEME to MODAL(finalize)
const Kitten = mongoose.model('Kitten', kittySchema);

//add objects(documents) in modal
var player1 = new Kitten({ name: "stoinis" });
console.log(player1.name); // 'stoiniss'
player1.speak();

var player2 = new Kitten({ name: "Bravo" });
player2.speak();

// SAVE ALL OBJECTS TO MONGO DATABASE
var sv = player2.save();
if (sv) {
    console.log('saved');
}
// fluffy.speak();



// Register using mongo db------------------------>>
// app.post(
//     '/register',
//     // username must be an email
//     body('email').isEmail(),
//     // password must be at least 5 chars long
//     body('password').isLength({ min: 5 }),
//     (req, res) => {
//         // Finds the validation errors in this request and wraps them in an object with handy functions
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         User.create({
//             username: req.body.username,
//             password: req.body.password,
//         }).then(user => res.json(user));

//         var name = req.body.name;
//         var email = req.body.email;
//         var pass = req.body.password;

//         const regSchema = new mongoose.Schema({
//             name: String,
//             email: String,
//             password: String
//         });

//         var register = mongoose.model('register', regSchema);

//         var user = new register({ name: `${name}`, email: `${email}`, password: `${pass}` });

//         var user_reg = user.save();
//         if (user_reg) {
//             console.log('registered');
//         }
//     },
// );
app.post("/register", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;

    const regSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    var register = mongoose.model('register', regSchema);

    var user = new register({ name: `${name}`, email: `${email}`, password: `${pass}` });

    var user_reg = user.save();
    if (user_reg) {
        console.log('registered');
        // alert('New User Registered Successfully..');
        res.redirect('/');
    }
})

// login
app.post('/', async(req,res) => {
    try{
        var username = req.body.email;
        var password = req.body.password;

        const useremail = await registers.findOne({email:username});
        res.send(useremail);
        console.log(useremail);

        // console.log(username + ' gd' + password);
    } catch{
        res.status(400).send("email invalid");
    }
})


app.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
}), function (req, res) {
});

// hollow ensure surprise flag walk soda online  level quote want youth exclude

