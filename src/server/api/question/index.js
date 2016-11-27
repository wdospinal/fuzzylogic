const express = require('express');
const { getQuestion, postQuestion, putQuestion, deleteQuestion } = require('./index.controller');

const router = express.Router();

router.get('/', getQuestion);
router.post('/', postQuestion);
router.put('/', putQuestion);
router.delete('/', deleteQuestion);

module.exports = router;
