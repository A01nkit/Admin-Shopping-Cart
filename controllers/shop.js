const Product = require('../models/product');
const db = require('../util/database');
const Cart = require('../models/cart');
//const fs = require('fs');
//const path = require('path');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then((result) => {
    console.table(result.rows)
    res.render('shop/product-list', {
      prods: result.rows,
      pageTitle: 'All Products', 
      path: '/products' 
    });  
  })
  .catch((err) => console.log('something went wrong in shop.js file getProducts function'+ err))
}; 

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;  //name we used after the colon
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,//key by which we are access in view: we are retriving
      pageTitle: product.title,
      path: '/products'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then((result) => {
    console.table(result.rows);
    res.render('shop/index', {
      prods: result.rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch((err) => console.log('something went wrong in shop.js file getIndex function'+ err))
       
};
 
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        products: cartProducts,
        path: '/cart',
        pageTitle: 'Your Cart'
      }); 
    });
  });

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });  
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  if (typeof window !== 'undefined') {
    console.log('You are on the browser')
    // 👉️ can use alert()
  } else {
    console.log('You are on the server')
    // 👉️ can't use alert()
  }
  
  res.redirect('/');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
 

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};  