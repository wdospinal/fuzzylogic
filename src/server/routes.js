const questionRouter = require('./api/question/index');

function setRoutes(app) {
  app.use('/api/question', questionRouter);
}

module.exports = setRoutes;
