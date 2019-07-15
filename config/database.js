const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const chalk = require('chalk');
const dbURL = require('./properties').DB;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = () => {
  mongoose.connect(dbURL);

  mongoose.connection.on('connected', () => {
    console.log(connected('Mongoose default connection is open to ', dbURL));
  });
  mongoose.connection.on('error', err => {
    console.log(error('Mongoose default connection has occured ' + err + ' error'));
  });
  mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose default connection is disconnected'));
  });
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(termination('Mongoose default connection is disconnected due to application termination'));
      process.exit(0);
    });
  });
};