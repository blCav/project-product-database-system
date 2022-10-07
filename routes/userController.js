const User = require('../models/allUsers');
const passport = require('passport');

module.exports = {

    LoginView : (req, res) => {
        res.render("login");
    },

    SignUpView : (req, res) => {
        res.render("signup")
    },

    //Création d'un nouvel utilisateur

    saveUser : (req, res, next) => {

        if(req.skip) {
            next();
        }

        const userParams = {
            name : req.body.name,
            email : req.body.email
        }
    
        const newUser = new User(userParams);
        User.register(newUser, req.body.password, (error, user) => {
            if(error) {
                req.flash("error_msg", `Sorry but you can only register with the same email once. Please try again !`);
                res.locals.redirect = "/login";
                next();

            } else {
                req.flash("success_msg", "Congratulations, you have now your own account ! Please proceed onward to connect!");
                res.locals.redirect = "/login";
                next();
            }
        }); 

    },

    //Redirection

    redirectView: (req, res) => {
        const redirectPath = res.locals.redirect;
        if (redirectPath)
            res.redirect(redirectPath);
    },

    //Authentification de l'utilisateur

    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/index",
        successFlash : { type: 'success_msg', message: 'Welcome to our Product Database System ! ' },
        failureFlash : { type: 'error_msg', message: 'Well, it is embarassing... Our datadase failed to find you. Your email and/or password seems wrong, please try again !' }

    })
    
}        

