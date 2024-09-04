const db = require('../util/database');
const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    async save() {
        await db.connect();
        return db.query('INSERT INTO products VALUES (?, ?, ?, ?)', [this.title, this.price, this.description, this.imageurl])
        .then()
        .catch((err) => {
            console.log('something went wrong in product.js file save method ' + err);
        })
        .finally(async () => {
            await db.end();
            console.log('successfully end the connection')
        })


         
    }


    static deleteById(id) {   

    }   

    static async fetchAll() {
        await db.connect();
        return db.query('SELECT * FROM products')
        .then()
        .catch((err) => console.log('something went wrong in product.js file fetchAll function ' + err))
        .finally(async () => {
            await db.end();
            console.log('successfully end the connection');
        }) 
    }            
    
    static findById(id) {
       
    }
};