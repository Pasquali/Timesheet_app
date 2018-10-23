var express = require("express");
var router = express.Router();

router.use("/", require("./routes/timesheet-routes"));

module.exports = router;
