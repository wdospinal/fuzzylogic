const express = require('express');
const { getCellphone, postCellphone, putCellphone, deleteCellphone, init } = require('./index.controller');

const router = express.Router();

/*
  Simple CRUD for questions
*/
router.get('/', getCellphone);
router.post('/', postCellphone);
router.put('/', putCellphone);
router.delete('/', deleteCellphone);

router.get('/init', init);

module.exports = router;
