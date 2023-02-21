const express = require("express");
const router = express.Router();
const { getSubjectsCancellations, cancellations } = require("../../api/index");

router.post("/", async function (req, res, next) {
  const { user, pass } = req.body;
  let data = "";
  if (user != undefined && pass != undefined && action != undefined) {
    if (action == "get" || action == "GET") {
      data = await getSubjectsCancellations({ user: user, pass: pass });
    } else if (
      (action == "SET" || action == "set") &&
      materia != undefined &&
      motivo != undefined
    ) {
      data = await cancellations({
        user: user,
        pass: pass,
        subject: materia,
        reason: motivo,
      });
    }
    res.status(200).json({ response: "success", message: data });
  } else {
    res.status(200).json({ response: "error", message: "Falta parametros." });
  }
});

module.exports = router;
