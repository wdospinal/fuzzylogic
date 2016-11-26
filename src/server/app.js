const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const configServer = require('./config/express-server');
const configRoutes = require('./routes');

const app = express();
const PORT = 3000;

configServer(app);
configRoutes(app);
app.use(express.static(path.join(__dirname, '../public')));

// Database Connection
mongoose.Promise = global.Promise;

const dbConnectionString = app.get('env') ? 'mongodb://localhost:27017/fuzzylogic' : 'mongodb://admin:123@ds013891.mlab.com:13891/cvlac';
mongoose.connect(dbConnectionString);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error : '));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ...`);
  });
});

module.exports = app;
