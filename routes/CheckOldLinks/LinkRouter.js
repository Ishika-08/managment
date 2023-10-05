const express = require('express');
const router = express.Router();
const LinkController = require('../../controllers/CheckOldLinks/LinkController');

router.get('/get-links', LinkController.getFaultyLinks);
router.put('/update-anchor/:rowId', LinkController.updateAnchorText);

module.exports = router;
