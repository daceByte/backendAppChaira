const express = require("express");
const router = express.Router();
const { DataUser } = require("../../api/index");

router.get("/", async function (req, res, next) {
  res.status(200).json({ response: "success", menssage: "1.0" });
});

module.exports = router;
