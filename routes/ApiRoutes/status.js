const express = require("express");
const router = express.Router();

router.get("/", async function (req, res, next) {
  res.status(200).json({ response: "success", message: "1.0" });
});

module.exports = router;
