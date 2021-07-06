# Manage Orders / Products (Assignment)
This web application to mange customers Orders & Products

## Features
  1. Customer Login
  2. Orders list(with pagination) & Update order status 
  3. Products list(with pagination) & Update quantity/status 


## Infrastructure

This applications consists of two parts:
  1. Frontend: Single Page Application built with: React and Material Ui.
  2. Backend: HTTP REST API built with Node.js, Express and MongoDB.
  3. Video to showcase all features [here](https://www.loom.com/share/9a01bdd472f64b7ca6a98dd2dd645f27)


## How to run app

### <u>Frontend</u>

to start the application open the <b>terminal/command line</b> go to <b>frontend</b> folder and execute `npm install` then :

`npm start`

once the app is running you can open: [http://localhost:3000](http://localhost:3000) on your browser.

### <u>Backend</u>

Open `./backend/src/config/config.js` file and replace MongoDB connection string in `dbConnectString` variable.

To run the api open the <b>terminal/command line</b> go to <b>backend</b> folder and execute `npm install` then:

`npm start`


## How to run tests

### <u>Frontend</u>
Make sure frontend(react) is running.  
`npm test`

- End-to-end tests using cypress libray.
- Test case 1: Login (/cypress/integration/login.spec.js)
- Test case 2: Update order status (/cypress/integration/orderStatus.spec.js)
- Test case 3: Update product status (/cypress/integration/productStatus.spec.js)
- Video for all test cases [here](https://www.loom.com/share/7c8c94ee642d4e8ca59fc061658f7102)


### <u>Backend</u>
Make sure backend server(nodejs) is not running.  
`npm test`

- Library used: mocha, chai, chai-http
- Test cases: Order List, Update order status (/test/tests.js)
- Postman collection for all apis [here](https://www.getpostman.com/collections/64d301eab607c25c0f3d)
- Video for all test cases [here](https://www.loom.com/share/563fb9ade4ce4ed3b6e0c27b561fd18b)