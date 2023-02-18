const { Adiciones } = require("../api/index");

async function x() {
  console.log(await Adiciones({ user: "di.cardenas", pass: "dace2003", motivo: "Me canse de la materia..." }));
}

x();
