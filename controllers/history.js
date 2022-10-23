const historyController = require("../controllers/history");
const modelHistory = require("../models/modelHistory");

exports.insertHistory = async function (req, res, next) {
    const userId = req.headers.tokenInfo.userId;
    const acneType = req.body.acneType;

    modelHistory.insertHistoryByHistoryData(userId, acneType);
    res.status(200).json({ message: "success" });
};

exports.getHistoryList = async function (req, res, next) {
    const userId = req.headers.tokenInfo.userId;
    const historyList = await modelHistory.getHistoryListByUserId(userId);
    res.status(200).json({ historyList: historyList });
};
