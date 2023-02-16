const express = require("express");
const router = express.Router();
const { Login } = require("../../api/index");

router.post("/", async function (req, res, next) {
  const { user, pass } = req.body;
  if (user != undefined && pass != undefined) {
    const data = await Login({ user: user, pass: pass });
    res.status(200).send({ response: "success", menssage: data });
  } else {
    res.status(200).send({ response: "error", menssage: "Falta parametros." });
  }
});

module.exports = router;
