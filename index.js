const express = require('express');
const app = express();
const port = require('./config/properties').PORT;
const db = require('./config/database');

// call the database connectivity function
db();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening on port ${port}`));