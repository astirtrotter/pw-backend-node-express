require('dotenv').config();

const express = require('express');
const app = express();
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./middleware/passport');

// call the database connectivity function
require('./config/database')();

// configure app.use()
app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// initialize express router
const router = require('./routes')(express.Router(), passport);

// use express router
app.use(router);

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  // var isOfApi = req.url.startsWith('/api/');
  // if (isOfApi) {
  //   return res.status(err.status).json({error: {message: err.message}});
  // }

  if (err.status === 401) {
    req.logout();
    res.redirect('/login');
  } else if (err.status === 404) {
    res.render('404', {
      title: 'Error',
      user: req.user,
      url: req.url
    });
  } else {
    res.render('error', {
      title: 'Error',
      user: req.user,
      error: err
    });
  }
});

// initialize server
const port = process.env.PORT;
app.listen(port, (req, res) => console.log(`App listening on port ${port}`));