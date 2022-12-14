//jshint esversion:6
require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")
//session
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findOrcreate")
//for hashing encryption
//const md5 = require("md5")
//bcrypt encryption
//const bcrypt = require("bcrypt");
//no of salting round
//const saltRounds = 10;

//mongoose encryption
// const encrypt = require("mongoose-encryption")

const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))
//passport to create and start session
app.use(session({
    secret: "our lttle secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true})
//to resolve deprecation warning of passport
mongoose.set("useCreateIndex", true)

//schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
})
//use passport to save into mongodb
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

//encryption, password will be encrypted at post request decrypted at findOne()

//userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ["password"]})

//model
const User = new mongoose.model("User", userSchema)

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req,res){
    res.render("home") 
})

app.get("/auth/google",
    passport.authenticate("google",{scope: ["profile"]})
)

app.get("/auth/google/secrets",
passport.authenticate("google",{ failureRedirect: "/login"}),
function(req, res){
    res.redirect('/secrets')
}
)

app.get("/login", function(req,res){
    res.render("login")
})
app.get("/register", function(req,res){
    res.render("register")
})

app.get("/secrets", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
        if(err){
            console.log(err);
        }else{
            if(foundUsers){
                res.render("secrets",{usersWithSecrets: foundUsers})
            }
        }
    })
    
})
app.get("/submit", function(req, res){
    if(req.isAuthenticated()){
        res.render("submit")
    }else{
        res.redirect("/login")
    }
})
app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
//to save session
User.findById(req.user.id, function(err, foundUser){
    if(err){
        console.log(err)
    }else{
        if(foundUser){
            foundUser.secret = submittedSecret;
            foundUser.save(function(){
                res.redirect("/secrets")
            });
        }
    }
})

})



app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
})
  app.post("/register", function(req,res){
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //         //for md5 encryption
    //         //password: md5(req.body.password)
    //     })
    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.render("secrets")
    //         }
    //     })
    // });
    User.register({username: req.body.username},req.body.password, function(err, user){
        if(err){
            console.log(err)
            res.redirect("/register")
        }else{
            passport.authenticate("local")(req, res,function(){
                res.redirect("/secrets")
            })
        }
    })
  })

  app.post("/login", function(req, res){
    //  const username = req.body.username;
    //  const password = req.body.password;

    //  User.findOne({email: username},function(err, foundUser){
    //     if(err){
    //         console.log(err)
    //     }
    //     else{
    //         if(foundUser){
    //             // Load hash from your password DB.
    //         bcrypt.compare(password, foundUser.password, function(err, result) {
    //             if(result === true){
    //                 res.render("secrets")
    //             }
    //         });
    //         }
    //     }
    //  })
     
         const user = new User({
            
                 username: req.body.username,
                 password: req.body.password
            })

            req.login(user, function(err){
                if(err){
                    console.log(err)
                }else{
                    passport.authenticate("local")(req, res, function(){
                        res.redirect("/secrets")
                    })
                }
            })
     })
 



app.listen(4000, function(){
    console.log("server started on port 4000")
})
//hash secret 
// SECRET=thisisourlittlesecret
// API_KEY=qwertyyasdfgasdfgh