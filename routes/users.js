var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const token = require("../middleware/decryptionToken");
const historyController = require("../controllers/history");

router.post("/join", (req, res) => {
    userController.insertUser(req, res);
});

router.post("/login", (req, res) => {
    userController.verify(req, res);
});

router.post("/logout", token.verifyToken, (req, res) => {
    userController.test(req, res);
});

router.post("/history", token.verifyToken, (req, res) => {
    historyController.insertHistory(req, res);
});

router.get("/history", token.verifyToken, (req, res) => {
    historyController.getHistoryList(req, res);
});

module.exports = router;
