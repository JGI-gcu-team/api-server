const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    sample: [
        body("email").not().isEmpty().withMessage("error message"),
        body("password").not().isEmpty().withMessage("error message"),
    ],
});
