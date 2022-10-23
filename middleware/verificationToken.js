const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (user_id, email) {
    return new Promise(async function (resolve, reject) {
        const accessToken = jwt.sign(
            {
                userId: user_id,
                email: email,
            },
            "process.env.SECRET_KEY",
            {
                subject: "IM_SERVER jwtToken",
                expiresIn: "2h",
                issuer: "id",
            },
        );
        resolve(accessToken);
    });
};
