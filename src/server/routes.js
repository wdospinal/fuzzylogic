const questionRouter = require('./api/question/index');
const responseRouter = require('./api/response/index');

function setRoutes(app) {
  app.use('/api/question', questionRouter);
  app.use('/api/response', responseRouter);
}

module.exports = setRoutes;
