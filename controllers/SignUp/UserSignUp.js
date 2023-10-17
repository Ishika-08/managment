const SignUpModel = require("../../models/SignUp/SignUp");

exports.UserSignUp = async (req, res) => {
    const { id } = req.params;
    const { password } = req.params;

    console.log(id, password);

    try {
        const userPresent = await SignUpModel.find({ user_id: id, password: password, isAdmin: "No" });
        console.log(userPresent);
        if (userPresent.length > 0) {
            res.json({ message: true });
        } else {
            res.json({ message: "Username or password is invalid" });
        }
    } catch (error) {
        res.json(error);
    }
};
