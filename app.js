const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const db  = require('./db');
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));



app.get('/', async function(req, res) {
    const companyname = req.body.companyName;
    const allItems = await db.getAllItems();
    res.render('index', {companyname, items: allItems} );
});

app.post('/getorders', async function(req, res) {
    const companyName =  req.body.companyName;
    console.log(companyName);
    const orderItem = await db.getAllOrders(companyName);
    console.log(orderItem);
    res.render('orders', {
        orderItem: orderItem,
        company: companyName
    });
});

app.post('/getordersofaddress', async function(req, res) {
    const customerAdress =  req.body.customerAddress;
    console.log(customerAdress);
    const orderItem = await db.getAllOrderOfAddress(customerAdress);
    console.log(orderItem);
    res.render('orders', {
        orderItem: orderItem,
        adress: customerAdress
    });
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

