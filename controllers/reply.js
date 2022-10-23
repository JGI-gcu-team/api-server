modelReply = require("../models/modelReply");
modelUsers = require("../models/modelUser");

exports.writeReply = async function (req, res, next) {
    const writer = await modelUsers.getUserEmailByUserId(
        req.headers.tokenInfo.userId,
    );
    const replyData = {
        writer: writer.email,
        postNo: req.params.postNo,
        content: req.body.content,
        parentId: req.body.parentId,
    };
    result = await modelReply.writeReplyByReplyData(replyData);
    res.status(200).json({ postNo: result.insertId });
};

exports.deleteReply = async function (req, res, next) {
    const replyId = req.body.replyId;
    const userId = req.headers.tokenInfo.userId;
    const replyOwner = await modelReply.getReplyOwnerByReplyId(replyId);
    if (replyOwner == undefined || replyOwner.delete_yn == "Y")
        return res.status(400).json({ error: "ALREADY_DELETE" });
    if (replyOwner.user_id != userId)
        return res.status(400).json({ error: "NO_PERMISSION" });

    await modelReply.deleteReplyByReplyId(replyId);
    res.status(200).json({ message: "success" });
};

exports.modifyReply = async function (req, res, next) {
    const replyId = req.body.replyId;
    const userId = req.headers.tokenInfo.userId;
    const replyOwner = await modelReply.getReplyOwnerByReplyId(replyId);
    if (replyOwner == undefined || replyOwner.delete_yn == "Y")
        return res.status(400).json({ error: "ALREADY_DELETE" });
    if (replyOwner.user_id != userId)
        return res.status(400).json({ error: "NO_PERMISSION" });

    const replyData = {
        replyId: replyId,
        content: req.body.content,
    };
    await modelReply.modifyReplyByReplyData(replyData);

    res.status(200).json({ replyId: replyId });
};

exports.getReplyList = async function (req, res, next) {
    const pagingData = {
        limit: Number(req.query.limit),
        pageId: (Number(req.query.pageId) - 1) * Number(req.query.limit),
        postNo: req.params.postNo,
    };
    const totalCount = await modelReply.getReplyTotalCountByPostNo(
        req.params.postNo,
    );
    replyList = await modelReply.getReplyListByPagingData(pagingData);

    res.status(200).json({
        totalCount: totalCount.totalCount,
        replyList: replyList,
    });
};
