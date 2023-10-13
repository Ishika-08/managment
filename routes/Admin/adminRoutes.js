const adminController = require("../../controllers/Admin/adminController")
const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//route to create a new collection and save it in TrackCollection Table
router.post("/:collectionName", adminController.createCollection)

router.post('/upload/:table', upload.single('csvFile'), adminController.AddDataController);

router.get("/websites", adminController.findWebsites)


module.exports = router