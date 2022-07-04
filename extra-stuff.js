// -----------------------------------------------------------------------------------------------------------
// app.post('/register', async (req, res) => {
//     try{
//         let foundUser = users.find((data) => req.body.email === data.email);
//         if (!foundUser) {

//             let hashPassword = await bcrypt.hash(req.body.password, 10);

//             let newUser = {
//                 id: Date.now(),
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: hashPassword,
//             };
//             users.push(newUser);
//             console.log('User list', users);

//             res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
//         } else {
//             res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
//         }
//     } catch{
//         res.send("Internal server error");
//     }
// });





//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------REGISTER(validation)---------------------------------------------------
// app.post("/register",
//     body('name'),
//     body('email').isEmail().normalizeEmail(),
//     body("password").isStrongPassword({
//         minLength: 8,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1
//     })
//     .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 success: false,
//                 errors: errors.array()
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Successfully registered',
//         })
//     }
// var sql = "INSERT INTO register(name, email, password) VALUES('"name"','"+email+"','"+password+"')";
//     conn.query(sql,function(err,result){
//         if(err) throw err;
//         res.status(200).render('login');
//         // console.log('inserted data');
//     });
// );
// -------------------------------------------------Validation REgister-----------------------------------------------
// -------------------------------------------------------------------------------------------------------------------
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

app.post('/user',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.create({
            username: req.body.username,
            password: req.body.password,
        }).then(user => res.json(user));
    },
);

{
    "errors" = [               // :
        {
            "location": "body",
            "msg": "Invalid value",
            "param": "username"
        }
    ]
}



// ----------------------------------------------Mongoose Schema/modal/savedata-----------------------------------------
// ------------------------------------------------------------------------------------------------------------------
// const fruitSchema = new mongoose.Schema({              //define schema
//     name: string
// });
const fruitSchema = new mongoose.Schema({
    name: String,
    color: String,
    qty: Number
});

fruitSchema.methods.speak = function speak() {           // schema methods
    var detail = "Name:- " + this.name + "Color:-" + this.color + "Quantity:-" + this.qty;
    console.log(detail);
}
// compile to model
var fruit = mongoose.model('fruit', fruitSchema);

//add obj/docs
var item1 = new fruit({ name: "mango", color: "yellow", qty: 100 });
var item2 = new fruit({ name: "apple", color: "red", qty: 500 });
var item3 = new fruit({ name: "grapes", color: "green", qty: 1000 });

function saveitems(item) {
    item.save();
}
saveitems(item1)
saveitems(item2)
saveitems(item3)