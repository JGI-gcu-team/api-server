const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service");
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage({}),
});

router.post("/analysis", upload.single("image"), async (req, res) => {
    serviceController.getAnalysisResult(req, res);
});

module.exports = router;
