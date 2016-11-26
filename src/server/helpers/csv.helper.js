const csv = require('fast-csv');

/**
 * Parse CSV content from a string
 * @param {string} data
 * @param {object} headers
 * @returns A promise of the parse operation
 */

function parseCSVFromString(data, headers) {
  return new Promise((resolve, reject) => {
    const parsedCSV = {
      headers: null,
      body: [],
    };

    csv.fromString(data, { headers, delimiter: ',' })
      .on('data', (obj) => {
        if (parsedCSV.headers) {
          parsedCSV.body.push(obj);
        } else {
          parsedCSV.headers = obj;
        }
      })
      .on('end', () => resolve(parsedCSV))
      .on('error', err => reject(new Error(err)));
  });
}

module.exports = {
  parseCSVFromString,
};