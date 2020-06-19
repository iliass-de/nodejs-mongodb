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

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// integrate public folder
app.use(express.static(__dirname + '/public'));

app.get('/', async function(req, res) {
    const companyname = req.body.companyName;
    const allItems = await db.getAllItems();
    res.render('index', {companyname, items: allItems} );
});

app.post('/getorders', async function(req, res) {
    const companyName =  req.body.companyName;
    const orderItem = await db.getAllOrders(companyName);
    res.render('orders', {
        orderItem: orderItem,
        company: companyName
    });
});

app.post('/getordersofaddress', async function(req, res) {
    const customerAdress =  req.body.customerAddress;
    const orderItem = await db.getAllOrderOfAddress(customerAdress);
    res.render('orders', {
        orderItem: orderItem,
        adress: customerAdress
    });
});

app.post('/deleteitem', function(req, res) {
    const delItem =  req.body.delItem;
    db.removeItem(parseInt(delItem));
    res.redirect('/');
});

app.post('/countItem', async function(req, res) {
    let result = await db.displayItems();
    res.render('duplicatedOrders', {
        result: result,
    });
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


