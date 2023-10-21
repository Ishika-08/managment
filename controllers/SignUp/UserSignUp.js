// const SignUpModel = require("../../models/SignUp/SignUp");

// exports.UserSignUp = async (req, res) => {
//     const { id } = req.params;
//     const { password } = req.params;

//     console.log(id, password);

//     try {
//         const userPresent = await SignUpModel.find({ user_id: id, password: password, isAdmin: "No" });
//         console.log(userPresent);
//         if (userPresent.length > 0) {
//             res.json({ message: true });
//         } else {
//             res.json({ message: "Username or password is invalid" });
//         }
//     } catch (error) {
//         res.json(error);
//     }
// };

const jwt = require('jsonwebtoken');
const SignUpModel = require("../../models/SignUp/SignUp");
const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

exports.UserSignUp = async (req, res) => {
    const { id, password } = req.params; 
    try {
        const user = await SignUpModel.findOne({ user_id: id, password: password, isAdmin: "No" });
        console.log("in controller" + process.env.JWT_SECRET_KEY)

        if (user) {
            console.log("user found")
            const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); 
            res.json({ token: token, message: true });
        } else {
            res.json({ message: "Username or password is invalid" });
        }
    } catch (error) {
        res.json({ message: "Internal server error" });
    }
};
