const path = require("path"),
  express = require("express"),
  app = express(),
  { start, api, apiSchedule, apiDataStudent, apiSubjects, apiRegisterExtend } = require("./routes");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/", start);
app.use("/Api", api);
app.use("/Api/Horario", apiSchedule);
app.use("/Api/Materias", apiSubjects);
app.use("/Api/Login", apiDataStudent);
app.use("/Api/RegisterExtend", apiRegisterExtend);

app.use(function (req, res) {
  res.render("error");
});

app.listen(3000, function () {
  console.log("AppWeb escuchando en el puerto 3000!");
});
