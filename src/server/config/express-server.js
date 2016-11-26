/**
 * Express default configuration file
 */

const bodyParser = require('body-parser');

function config(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if (app.get('env') === 'development') {
    app.use(require('connect-livereload')({
      port: 35729,
    }));
  }
}

module.exports = config;
