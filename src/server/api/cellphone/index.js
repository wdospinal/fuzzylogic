const express = require('express');
const { getCellphone, postCellphone, putCellphone, deleteCellphone, getCellphoneByParentType, init } = require('./index.controller');

const router = express.Router();

/*
  Simple CRUD for questions
*/
router.get('/', getCellphone);
router.post('/', postCellphone);
router.put('/', putCellphone);
router.delete('/', deleteCellphone);

module.exports = router;
