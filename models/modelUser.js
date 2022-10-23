const db = require("../database/db");

exports.getUserInfoByEmail = async function (email) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                email
            FROM
                user
            WHERE
                email = ?
            `;
        db.query(query, [email], function (err, data) {
            if (err) reject(err);
            else resolve();
        });
    });
};

exports.getUserEmailByUserId = async function (userId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                email
            FROM
                user
            WHERE
                user_id = ?
            `;
        db.query(query, [userId], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

exports.insertUserAtJoin = function (email, password, salt) {
    return new Promise(function (resolve, reject) {
        var query = `
                INSERT INTO
                    user ( email, password, salt)
                VALUES
                    ( ?, ?, ?)
                `;
        db.query(query, [email, password, salt], function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
};

exports.getUserByEmail = async function (email) {
    return new Promise(function (resolve, reject) {
        var query = `
            SELECT
                email, password, salt, user_id
            FROM
                user
            WHERE
                email = ?
            `;
        db.query(query, [email], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
