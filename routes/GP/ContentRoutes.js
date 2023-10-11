const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/GP/ContentController');

// Add data to the mentioned table
router.post('/add/:table', contentController.addDataToTable);

//update data in mentioned table
router.put('/update/:table', contentController.updataDataToTable);

//Get topics from ExtraContents table
router.get("/topics/:site", contentController.getTopics)

// Get data from contents table by ID
router.get('/update/:id', contentController.getDataById);
router.get("/search/:searchEmail/", contentController.getDataByEmail)
router.get("/all", contentController.getAll)
router.get("/search/status/:searchStatus/", contentController.getDataByStatus)

// Update data in contents table by ID
router.put('/update/:id', contentController.updateDataById);

// Delete entries from specified tables
router.delete('/delete/:tableName', contentController.deleteEntries);


module.exports = router;
