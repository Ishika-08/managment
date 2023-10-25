const express = require("express")
const router = express.Router()
const DownloadDataController = require("../../controllers/DownloadData/DownloadDataController")
//route to get names of all the collecitons
router.get("/names", DownloadDataController.CollectionNames)

//route to get csv file
router.get("/table/:tableName", DownloadDataController.generateCSV)

module.exports = router