const express = require('express');
const router = express.Router();
const LinkController = require('../../controllers/CheckOldLinks/LinkController');

router.get('/get-links', LinkController.getFaultyLinks);
router.get('/get-links/:model', LinkController.getWebsiteData);
router.put('/update-anchor/:rowId', LinkController.updateAnchorText);
router.put('/update/:table/:selectRowId', LinkController.updateWebsite);
router.delete('/delete/:id', LinkController.delete )
router.delete("/delete/table/:tableName", LinkController.deleteWebsiteTable)

module.exports = router;
