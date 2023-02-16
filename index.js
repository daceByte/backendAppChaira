const path = require("path"),
  express = require("express"),
  app = express(),
  { start, apiHorario, apiDataUser, apiIndex } = require("./routes");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/", start);
app.use("/Api", apiIndex);
app.use("/Api/Horario", apiHorario);
app.use("/Api/Login", apiDataUser);

app.use(function (req, res) {
  res.render("error");
});

app.listen(3000, function () {
  console.log("AppWeb escuchando en el puerto 3000!");
});
