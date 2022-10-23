const db = require("../database/db");

exports.insertHistoryByHistoryData = async function (userId, acneType) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                history ( user_id, acne_type)
            VALUES
                ( ?, ?)
            `;
        db.query(query, [userId, acneType], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getHistoryListByUserId = async function (userId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                analysis_date AS analysisDate, acne_type AS acneType
            FROM
                history
            WHERE
                user_id = ?
            `;
        db.query(query, [userId], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
