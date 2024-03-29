const express = require('express');
const { getQuestion, postQuestion, putQuestion, deleteQuestion, getQuestionByParentType, init } = require('./index.controller');

const router = express.Router();

/*
  Simple CRUD for questions
*/
router.get('/', getQuestion);
router.post('/', postQuestion);
router.put('/', putQuestion);
router.delete('/', deleteQuestion);

// Get questions depending of principal question
router.get('/parentType', getQuestionByParentType);
router.get('/init', init);

module.exports = router;
