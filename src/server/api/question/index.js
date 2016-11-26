const express = require('express');
const { parseTeachers } = require('./index.controller');
/**
 * Endpoints:
 * /api/cvlac/teachers/parse
 */

const router = express.Router();

/**
 * Parse teachers endpoint
 * @data: csv string with the teachers information
 * @response: json object with the teachers parsed
 */
router.post('/teachers/parse', parseTeachers);


module.exports = router;
