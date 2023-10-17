const mongoose = require("mongoose")

const SignUpSchema = new mongoose.Schema(  
    {
        user_id: String,
        password: String,
        isAdmin: String
    },
    {
        collection: "SignUp"
    }
)

const SignUpModel = mongoose.model("SignUp", SignUpSchema)

module.exports = SignUpModel