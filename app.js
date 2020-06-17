const http = require('http');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const db  = require('./db');
const port = 3000;
const readline = require('readline');


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

console.log("Aufgaben:");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Aufgabe 1
rl.question('Enter a company name? ', (answer) => {
    db.getAllOrders(answer);
    //console.log(`Thank you for your valuable feedback: ${answer}`);

//Aufgabe 2
    rl.question('Enter an address? ', (answer) => {

        db.getAllOrderOfAddress(answer);
        //console.log(`Thank you for your valuable feedback: ${answer}`);
        rl.close();
    });

    //Aufgabe 2
    rl.question('Enter spmething more? ', (answer) => {

        db.getAllOrderOfAddress(answer);
        //console.log(`Thank you for your valuable feedback: ${answer}`);
        rl.close();
    });

});

// index page
/* app.get('/', function(req, res) {
    res.render('index');
});*/

app.get('/', async function(req, res) {
    const companyname = req.body.companyName;
    res.render('index', {companyname} );
});

app.post('/getorders', async function(req, res) {
    let companyName =  req.body.companyName;
    console.log(companyName);
    let orderItem = await db.getAllOrders(companyName);
    console.log(orderItem);
    res.render('orders', {
        orderItem: orderItem,
        company: companyName
    });
});

app.post('/getordersofaddress', async function(req, res) {
    let customerAdress =  req.body.customerAddress;
    console.log(customerAdress);
    let orderItem = await db.getAllOrderOfAddress(customerAdress);
    console.log(orderItem);
    res.render('orders', {
        orderItem: orderItem,
        adress: customerAdress
    });
});


app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


