const userModel = require("../models/modelUser");
const encryption = require("../middleware/encryptionPassword");
const publishToken = require("../middleware/verificationToken");
const decodeToken = require("../middleware/decryptionToken");

exports.insertUser = async function (req, res, next) {
    const hashedPasswordAndSalt = await encryption.createHashedPassword(
        req.body.password,
    );
    const userInfo = await userModel.getUserInfoByEmail(req.body.email);
    if (!userInfo) {
        await userModel.insertUserAtJoin(
            req.body.email,
            hashedPasswordAndSalt.password,
            hashedPasswordAndSalt.salt,
        );
        res.status(200).json({ message: "success" });
    } else {
        res.status(400).json({ error: "ALREADY_EXITS" });
    }
};
exports.verify = async function (req, res, next) {
    try {
        const checkUserInfo = await userModel.getUserByEmail(req.body.email);
        await encryption.verifyPassword(
            req.body.password,
            checkUserInfo[0].salt,
            checkUserInfo[0].password,
        );

        const token = await publishToken.createToken(
            checkUserInfo[0].user_id,
            checkUserInfo[0].email,
        );
        return res.status(200).json({ token: token });
    } catch (error) {
        res.status(400).json({ error: "INVALID_PASSWORD" });
    }
};

exports.test = function (req, res, next) {
    const userInfo = req.headers.tokenInfo;

    res.json({ email: userInfo.email });
};
