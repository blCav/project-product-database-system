const express = require('express');
const app = express();
const mongoose = require('mongoose');

const passport = require('passport');
const expressSession =require('express-session');
const cookieParser = require('cookie-parser');

const connectFlash = require('connect-flash');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const productsRoute = require("./routes/api");
const errorController = require('./routes/errorController');


const localStrategy = require('passport-local').Strategy;

dotenv.config({path : './config.env'});

mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true});
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const expressLayouts = require("express-ejs-layouts");
allProducts = require('./models/allProducts');
app.use(expressLayouts);
app.set('layout', './layouts/layout')

app.use(methodOverride('_method'));

// Session d'un utilisateur

app.use(cookieParser("SecretStringForSession"));
app.use(
    expressSession({
    secret : "SecretStringForSession",
    cookie : {
        maxAge: 4000000
    },
    resave : false,
    saveUninitialized : false
}))

// Protection des données de l'utilisateur (mot de passe) avec Passport Local Mongoose

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/allUsers');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.currentUser = req.user;
    next();
});

//Routes de l'application

app.use(productsRoute);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})