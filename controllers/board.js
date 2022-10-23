const modelBoard = require("../models/modelBoard");
const modelReply = require("../models/modelReply");
const modelUsers = require("../models/modelUser");

exports.writePost = async function (req, res, next) {
    const writer = await modelUsers.getUserEmailByUserId(
        req.headers.tokenInfo.userId,
    );
    const postData = {
        userId: req.headers.tokenInfo.userId,
        writer: writer.email,
        title: req.body.title,
        content: req.body.content,
    };
    result = await modelBoard.writePostByPostData(postData);
    res.status(200).json({ postNo: result.insertId });
};

exports.deletePost = async function (req, res, next) {
    const userId = req.headers.tokenInfo.userId;
    const postNo = req.params.postNo;
    const postOwner = await modelBoard.getPostOwnerByPostNo(postNo);
    if (postOwner == undefined || postOwner.delete_yn == "Y")
        return res.status(400).json({ error: "ALREADY_DELETE" });
    if (postOwner.user_id != userId)
        return res.status(400).json({ error: "NO_PERMISSION" });

    modelBoard.deletePostByPostNo(postNo);
    modelReply.deleteAllReplyByPostNo(postNo);

    res.status(200).json({ message: "success" });
};

exports.modifyPost = async function (req, res, next) {
    const userId = req.headers.tokenInfo.userId;
    const postNo = req.params.postNo;
    const postOwner = await modelBoard.getPostOwnerByPostNo(postNo);
    if (postOwner == undefined || postOwner.delete_yn == "Y")
        return res.status(400).json({ error: "ALREADY_DELETE" });
    if (postOwner.user_id != userId)
        return res.status(400).json({ error: "NO_PERMISSION" });

    const postData = {
        postNo: postNo,
        title: req.body.title,
        content: req.body.content,
    };
    await modelBoard.modifyPostByPostData(postData);

    res.status(200).json({ postNo: req.params.postNo });
};

exports.getPostList = async function (req, res, next) {
    const pagingData = {
        limit: Number(req.query.limit),
        pageId: (Number(req.query.pageId) - 1) * Number(req.query.limit),
        searchKeyword: req.query.searchKeyword,
        searchType: req.query.searchType,
    };

    pageList = await modelBoard.getPostListByPagingData(pagingData);
    res.status(200).json({ postList: pageList });
};

exports.getPostDetail = async function (req, res, next) {
    const postNo = req.params.postNo;
    postDetail = await modelBoard.getPostDetailByPostNo(postNo);

    if (!postDetail) return res.status(400).json({ error: "NO_EXIST_POST" });
    if (postDetail.delete_yn == "Y")
        return res.status(400).json({ error: "ALREADY_DELETE_POST" });

    res.status(200).json({ postDetail: postDetail });
};
