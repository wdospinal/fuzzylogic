/**
 * Request processing controller
 */

const { parseCSVFromString } = require('../../helpers/csv.helper');

function respondWithError(res, code) {
  const statusCode = code || 500;
  return err => res.status(statusCode).send(err);
}

function respondWithResult(res, code) {
  const statusCode = code || 200;
  return (result) => {
    if (result) {
      res.status(statusCode).json(result);
    }
  };
}

function parseTeachers(req, res) {
  const csvData = req.body.data;
  if (!csvData) {
    respondWithError(res, 422)('data param is required');
  }

  parseCSVFromString(csvData)
    .then(JSON.stringify)
    .then(respondWithResult(res))
    .catch(respondWithError(res));
}


module.exports = {
  parseTeachers,
};