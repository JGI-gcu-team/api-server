const db = require("../database/db");

exports.writePostByPostData = async function (postData) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                board ( user_id, writer, title, content)
            VALUES
                ( ?, ?, ?, ?)
            `;
        db.query(
            query,
            [
                postData.userId,
                postData.writer,
                postData.title,
                postData.content,
            ],
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

exports.getPostListByPagingData = async function (pagingData) {
    return new Promise(function (resolve, reject) {
        let searchWhere = "";
        if (pagingData.type == "writer")
            searchWhere = `AND ${pagingData.searchType} LIKE "%${pagingData.searchKeyword}%"`;
        else pagingData.type == "content";
        searchWhere = `AND ${pagingData.searchType} LIKE "%${pagingData.searchKeyword}%"`;

        query = `
            SELECT
                post_no AS postNo, writer, title, regist_date AS registDate
            FROM 
                board
            WHERE
                delete_yn = 'N'
                ${searchWhere}
            ORDER BY
                post_no DESC
            LIMIT ? OFFSET ?
            `;
        db.query(
            query,
            [pagingData.limit, pagingData.pageId],
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            },
        );
    });
};

exports.modifyPostByPostData = async function (postData) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE 
                board
            SET 
                title = ?, content = ?
            WHERE 
                post_no = ?
            `;
        db.query(
            query,
            [postData.title, postData.content, postData.postNo],
            function (err, result) {
                if (err) reject(err);
                else resolve(result[0]);
            },
        );
    });
};

exports.deletePostByPostNo = async function (postNo) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE 
                board
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

exports.getPostDetailByPostNo = async function (postNo) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                post_no AS postNo, writer, title, content, regist_date AS registDate, delete_yn
            FROM 
                board
            WHERE
                post_no = ?
            `;
        db.query(query, [postNo], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

exports.getPostOwnerByPostNo = async function (postNo) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                user_id, delete_yn
            FROM 
                board
            WHERE
                post_no = ?
            `;
        db.query(query, [postNo], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

exports.getPostTotalCount = async function () {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                COUNT(post_no) as totalCount
            FROM 
                board
            WHERE
                delete_yn = 'N'
            `;
        db.query(query, [], function (err, result) {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};
