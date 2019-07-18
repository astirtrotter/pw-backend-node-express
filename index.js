require('dotenv').config();

const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.DB,
    collection: 'sessions',     // default
    resave: false,              // don't save session if unmodified
    autoRemove: 'native',       // default
    ttl: 14 * 24 * 60 * 60      // default: 14 days
  })
}));
app.use(methodOverride('_method'));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// initialize express router
const router = require('./routes')(express.Router());

// use express router
app.use(router);

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  var isOfApi = req.url.startsWith('/api/');
  if (isOfApi) {
    return res.status(err.status).json({error: {message: err.message}});
  }

  if (err.status === 401) {
    res.redirect('/login');
  } else if (err.status === 404) {
    res.render('404', {url: req.url});
  } else {
    res.render('error', {error: err});
  }
});

// initialize server
const port = process.env.PORT;
app.listen(port, (req, res) => console.log(`App listening on port ${port}`));