const express = require("express");
const router = express.Router();
const { DataUser } = require("../../api/index");

router.post("/", async function (req, res, next) {
  res.status(200).send({ response: "success", menssage: "1.0" });
});

module.exports = router;
