const questionRouter = require('./api/question/index');
const responseRouter = require('./api/response/index');
const cellphoneRouter = require('./api/cellphone/index');

function setRoutes(app) {
  app.use('/api/question', questionRouter);
  app.use('/api/response', responseRouter);
  app.use('/api/cellphone', cellphoneRouter);
}

module.exports = setRoutes;
