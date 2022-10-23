const db = require("../database/db");

exports.getReplyListByPagingData = async function (pagingData) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                reply_id AS replyId, writer, content, reply_date AS replyDate, parent_id AS parentId
            FROM 
                reply
            WHERE
                delete_yn = 'N'
                AND post_no = ?
            ORDER BY
                reply_id
            LIMIT ? OFFSET ?
            `;
        db.query(
            query,
            [pagingData.postNo, pagingData.limit, pagingData.pageId],
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

exports.writeReplyByReplyData = async function (replyData) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                reply ( post_no, writer, content, parent_id)
             VALUES
                ( ?, ?, ?, ?)
            `;
        db.query(
            query,
            [
                replyData.postNo,
                replyData.writer,
                replyData.content,
                replyData.parentId,
            ],
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

exports.modifyReplyByReplyData = async function (replyData) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE 
                reply
            SET 
                content = ?
            WHERE 
                reply_id = ?
            `;
        db.query(
            query,
            [replyData.content, replyData.replyId],
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

exports.deleteReplyByReplyId = async function (replyId) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE 
                reply
            SET 
                delete_yn = 'Y'
            WHERE 
                reply_id = ?
            `;
        db.query(query, [replyId], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.deleteAllReplyByPostNo = async function (postNo) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE 
                reply
            SET 
                delete_yn = 'Y'
            WHERE 
                post_no = ?
            `;
        db.query(query, [postNo], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

exports.getReplyOwnerByReplyId = async function (replyId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                user_id, delete_yn
            FROM 
                reply
            WHERE
                reply_id = ?
            `;
        db.query(query, [replyId], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

exports.getReplyTotalCountByPostNo = async function (postNo) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT COUNT(reply_id) AS totalCount
            FROM reply
            WHERE 
                post_no = ?
                AND delete_yn = 'N'
            `;
        db.query(query, [postNo], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};
