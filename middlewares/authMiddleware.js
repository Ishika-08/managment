const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})

const authenticateToken = (req, res, next) => {
    console.log("in middleware " + process.env.JWT_SECRET_KEY)

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token)
    // console.log(req.headers)

    if (!token) return res.status(401).json({ message: 'Token not provided' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
