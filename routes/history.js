const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history");
const token = require("../middleware/decryptionToken");

router.post("/", token.verifyToken, (req, res) => {
    historyController.insertHistory(req, res);
});

router.get("/", token.verifyToken, (req, res) => {
    historyController.getHistoryList(req, res);
});

module.exports = router;
