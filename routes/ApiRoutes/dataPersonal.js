const express = require("express");
const router = express.Router();
const { DataUser } = require("../../api/index");

router.post("/", async function (req, res, next) {
  const { user, pass } = req.body;
  if (user != undefined && pass != undefined) {
    const data = await DataUser({ user: user, pass: pass });
    res.status(200).json({ response: "success", message: data });
  } else {
    res.status(200).json({ response: "error", message: "Falta parametros." });
  }
});

module.exports = router;
