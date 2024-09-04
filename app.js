const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./util/database');

app.set('view engine','ejs');
app.set('views','views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));//it serve static files(we give path to that folder for which want to serve statically) its only read axcess. 
                                                        //Here, we are serving main.css etc. we can have multiple static middleware eg:for image folder

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
