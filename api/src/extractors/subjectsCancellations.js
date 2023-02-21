/**
 * Recibe el html de las materias disponibles para listar las materias para
 * cancelar dentro de chaira.
 *
 * @param {String} [html]
 * @returns {JSON} [Materias Cancelables]
 */
module.exports = function (x) {
  if (x == null || x == "") {
    return {
      error: 500,
      content: "No se pudo procesar el horario correctamente...",
    };
  }

  x = x.split("<");
  let materia = "",
    response = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i].includes('class="x-grid-group-hd"')) {
      materia = x[i + 2].split(">")[1];
    } else if (x[i].includes("Matriculada") && materia != "") {
      response.push({ materia: materia, estado: "Matriculada" });
      materia = "";
    } else if (x[i].includes("Pendiente") && materia != "") {
      response.push({ materia: materia, estado: "Pendiente" });
      materia = "";
    }
  }
  return response;
};
