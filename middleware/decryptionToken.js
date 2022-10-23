const jwt = require("jsonwebtoken");
require("dotenv").config();
const verificationToken = require("./verificationToken");

exports.verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    try {
        jwt.verify(token, "process.env.SECRET_KEY");
        req.headers.tokenInfo = jwt.decode(token);
        next();
    } catch (err) {
        if (err.message === "jwt expired")
            res.status(400).json({ err: "EXPIRED_TOKEN" });
        else if (err.message === "invalid token")
            res.status(400).json({ err: "INVALID_TOKEN" });
        else return res.status(400).json({ err: err.message });
    }
};
