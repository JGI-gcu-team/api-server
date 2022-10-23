const express = require("express");
const router = express.Router();
const token = require("../middleware/decryptionToken");
const boardController = require("../controllers/board");
const replyController = require("../controllers/reply");

router.get("/list", (req, res) => {
    boardController.getPostList(req, res);
});

router.post("/write", token.verifyToken, (req, res) => {
    boardController.writePost(req, res);
});

router.get("/:postNo", (req, res) => {
    boardController.getPostDetail(req, res);
});

router.put("/:postNo/modify", token.verifyToken, (req, res) => {
    boardController.modifyPost(req, res);
});

router.put("/:postNo/delete", token.verifyToken, (req, res) => {
    boardController.deletePost(req, res);
});

router.get("/:postNo/reply", (req, res) => {
    replyController.getReplyList(req, res);
});

router.post("/:postNo/reply", token.verifyToken, (req, res) => {
    replyController.writeReply(req, res);
});

router.put("/:postNo/reply/modify", token.verifyToken, (req, res) => {
    replyController.modifyReply(req, res);
});

router.put("/:postNo/reply/delete", token.verifyToken, (req, res) => {
    replyController.deleteReply(req, res);
});

module.exports = router;
