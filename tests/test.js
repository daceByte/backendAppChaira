const { DataUser } = require("../api/index");

async function x() {
  console.log(await DataUser({ user: "di.cardenas", pass: "dace2003" }));
}

x();
