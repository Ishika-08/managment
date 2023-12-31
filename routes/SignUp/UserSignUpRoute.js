const express = require('express')
const router = express.Router()
const UserSignUpController = require("../../controllers/SignUp/UserSignUp") 
const AdminSignUpController = require("../../controllers/SignUp/AdminSignUp") 
const authenticateToken = require('../../middlewares/authMiddleware');


router.get("/:id/:password", UserSignUpController.UserSignUp)
// router.get("/:id/:password", authenticateToken, UserSignUpController.UserSignUp);

router.get("/admin/:id/:password", AdminSignUpController.AdminSignUp)

module.exports = router