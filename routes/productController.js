const itemProduct = require('../models/allProducts');

// Création d'un nouveau produit

exports.getProduct = (req, res) => {
    res.render('new');
}

exports.saveProduct = (req, res) => {
    code = req.body.code;
    descriptionProduct = req.body.descriptionProduct;
    price = req.body.price;

    const newItemProduct = new itemProduct({
        code: code, 
        descriptionProduct: descriptionProduct, 
        price: price
    });

    itemProduct.create(newItemProduct)
    .then(result => {
        req.flash("success_msg", "Product data added to database successfully");
        res.redirect("/index");
    })
    .catch(error => {
         req.flash("error_msg", `Failed to add product data to database`);
         res.redirect("/index");
    });
};

// Affichage de tous les produits
    
exports.getAllProducts = (req, res) => {
    itemProduct.find({})
      .then(oneProduct => {
        res.render("index", {oneProduct : oneProduct});
      })
      .catch(error => {
          res.redirect("/");
      })
};


// Éditer un produit

exports.editProduct = (req, res) => {
    const searchQuery = {_id : req.params.id};
    itemProduct.findOne(searchQuery)
        .then(product => {
            res.render("edit", {product : product});
        })
        .catch(error => {
            res.redirect("/index");
        });
};

exports.updateProduct = (req, res) => {
    const searchQuery = {_id : req.params.id};
    itemProduct.updateOne(searchQuery, {$set: {
        code: req.body.code, 
        descriptionProduct: req.body.descriptionProduct, 
        price: req.body.price
    }})
    .then(product => {
        req.flash("success_msg", "Product data updated successfully");
         res.redirect("/index");
    })
    .catch(error => {
        req.flash("error_msg", `Failed to update product data`);
        res.redirect("/index");
    });
};

// Suppression d'un produit

exports.deleteProduct = (req, res) => {
    const searchQuery = {_id : req.params.id};
    itemProduct.deleteOne(searchQuery)
    .then(() => {
        req.flash("success_msg", "Product data deleted successfully");
        res.redirect("/index");
    })
    .catch(error => {
        res.redirect("/index");
    });
};   


// Recherche d'un produit

exports.getOneProduct = (req, res) => {
    let searchQuery = {code : req.query.code};

    itemProduct.findOne(searchQuery)
        .then(product => {
            res.render('search', {product : product});
        })
        .catch(error => {
            req.flash('error_msg', 'ERROR: ' + error)
            res.redirect('/index');
        });
};