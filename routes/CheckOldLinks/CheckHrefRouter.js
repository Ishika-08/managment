const express = require('express');
const router = express.Router();
const checkHrefController = require('../../controllers/CheckOldLinks/CheckHrefController');

router.get('/15days', checkHrefController.checkHref);

module.exports = router;
