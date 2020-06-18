# MongoDb and NodeJs App

## Requirements

* Node.js v10+
* MongoDB running on local instance

## Environment Variables
* PORT: 3000
## Installation
* Clone the app  
`git clone https://github.com/iliassh1/nodejs-mongodb`
* Install dependencies  
`cd nodejs-mongodb`  
`npm install`  
* Import data from a csv file to MongoDb with the command:    
`mongoimport -d data -c order --type csv --file data/data.csv --headerline`  
* Run the App  
`node app.js`
* Connect to the app with:  
`http://127.0.0.1:3000/`
