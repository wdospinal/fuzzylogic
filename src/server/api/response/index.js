const express = require('express');
const { postResponse } = require('./index.controller');

const router = express.Router();

/*
  Simple CRUD for Responses
*/
router.post('/', postResponse);


module.exports = router;
