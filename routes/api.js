const express = require('express');
const router = express.Router();

const productController = require('./productController');
const userController = require('./userController');

//Routes concernant l'authentification de l'utilisateur

router.get('/login', userController.LoginView);
router.get("/", (req, res)=> {res.redirect('/login')});

router.get('/signup', userController.SignUpView);

router.post('/signup', userController.saveUser, userController.redirectView);

router.post('/login', userController.authenticate);

router.get("/logout", (req, res)=> {req.logout(), res.redirect("/")});


//Routes concernant la base de données des produits

router.get('/index', productController.getAllProducts);

router.get('/product/new', productController.getProduct);
router.post('/product/new', productController.saveProduct);

router.get('/edit/:id', productController.editProduct);
router.put('/edit/:id', productController.updateProduct);

router.delete('/delete/:id', productController.deleteProduct);

router.get('/product/search', (req, res)=> {res.render("search", {product: ""})});

router.get('/search', productController.getOneProduct);

module.exports = router


