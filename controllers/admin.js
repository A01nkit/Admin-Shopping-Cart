const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
    pageTitle: 'Add product', 
    path: '/admin/add-product' ,
    editing: false
    });
};
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description =req.body.description;

    const product = new Product(null, title, imageUrl, description, price);//same order as define in constructor
    product.save()
    .then(() => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log('something went wrong in admin.js file postAddProduct function ' + err);
    })
       
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit product', 
            path: '/admin/edit-product',
            editing: editMode, 
            product: product
        });
    });
};

exports.PostEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription =req.body.description;
     
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);//same order as define in constructor
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products', 
          path: '/admin/products', 
        }); 
    }); 
};