tf = require("@tensorflow/tfjs-node");
const jpeg = require("jpeg-js");
const fs = require("fs");

exports.getAnalysisResult = async function (req, res) {
    const classes = {
        0: "blackhead",
        1: "cystic",
        2: "nodules",
        3: "others",
        4: "papula",
        5: "pustular",
        6: "whitehead",
    };
    const model = await tf.loadLayersModel(
        tf.io.fileSystem("predictModel/model.json"),
    );

    const tensor = tf.tidy(() => {
        const decode = tf.node.decodeImage(req.file.buffer, 3);
        const image = decode.cast("float32").div(255.0);
        const reImage = tf.image.resizeBilinear(image, (size = [224, 224]));
        const expand = tf.expandDims(reImage, 0);
        return expand;
    });
    const prediction = await model.predict(tensor).array();
    const result = prediction[0].reduce((a, b) => Math.max(a, b), -Infinity);

    res.json({
        result: classes[prediction[0].indexOf(result)],
        percent: result,
    });
};
