const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, {useUnifiedTopology: true});

module.exports = {

    // get all items
    getAllItems: function() {
        return client.connect().then((client)=>{
            let db = client.db('data')
            return db.collection('order').find().toArray();
        });
    },

    //Aufgabe 1: show all orders from a particular company
    getAllOrders:  function(companyName) {
        return client.connect().then((client)=>{
            let db = client.db('data')
           return db.collection('order').find({companyName:companyName}).toArray();
        });
    },

    //Aufgabe 2:  Show all orders to a particular address
    getAllOrderOfAddress: function(address) {
        return client.connect().then((client)=>{
            let db = client.db('data')
            return db.collection('order').find({customerAdress:address}).toArray();
        });
    },
    //Task 3: remove item
    removeItem: function(item) {
            client.connect().then((client)=>{
            let db = client.db('data')
            db.collection('order').deleteOne({orderId: item},  function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
            });
        });
    },

};




