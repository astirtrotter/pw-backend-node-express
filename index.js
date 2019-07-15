const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = require('./config/properties').PORT;
const db = require('./config/database');

// configure body parser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

// call the database connectivity function
db();

// configure app.use()
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use('/static', express.static(path.join(__dirname, 'public')));

// view engine
app.set('view engine', 'pug');

// error handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

// initialize express router
const router = require('./routes')(express.Router());

// use express router
app.use(router);

// initialize server
app.listen(port, (req, res) => console.log(`App listening on port ${port}`));