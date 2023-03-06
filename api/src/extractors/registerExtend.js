/**
 * Recibe el html del registro extendido de la pagina chaira y lo extrae
 * para organizarlo en JSON.
 *
 * @param {String} [html]
 * @returns {JSON} [Registro Extendido]
 */
module.exports = function (x) {
  if (x == "" || x == null) {
    return {
      error: 500,
      content: "No se pudo procesar el registro extendido correctamente...",
    };
  }

  x = x.split("<");
  let y = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i].split(">")[1] != "") {
      y.push(x[i].split(">")[1]);
    }
  }

  let registro = [];
  let semestre = [];
  let tempIndex = 1,
    id = "",
    code = "",
    materia = "",
    idSemestre = "",
    creditos = "",
    horas = "",
    nota = "",
    habi = "",
    final = "",
    aprove = "",
    fallas = "",
    action = true;

  for (let i = 19; i < y.length; i++) {
    if (y[i] == "&nbsp;" && y[i + 1] == "&nbsp;") {
      action = false;
    } else if (y[i] == "Fallas") {
      action = true;
      registro.push(semestre);
    } else if (action) {
      if (id == "") {
        id = y[i];
      } else if (code == "") {
        code = y[i];
      } else if (materia == "") {
        materia = y[i];
      } else if (idSemestre == "") {
        idSemestre = y[i];
      } else if (creditos == "") {
        creditos = y[i];
      } else if (horas == "") {
        horas = y[i];
      } else if (nota == "") {
        nota = y[i];
      } else if (habi == "") {
        if (y[i] != "&nbsp;") {
          habi = y[i];
        } else {
          habi = "0.0";
        }
      } else if (final == "") {
        final = y[i];
      } else if (aprove == "") {
        aprove = y[i];
      } else if (fallas == "") {
        fallas = y[i];
        semestre.push({
          id: id,
          codigo: code,
          materia: materia,
          semestre: idSemestre,
          creditos: creditos,
          horas: horas,
          nota: nota,
          habilitacion: habi,
          final: final,
          estado: aprove,
          fallas: fallas,
        });
        id = "";
        code = "";
        materia = "";
        idSemestre = "";
        creditos = "";
        horas = "";
        nota = "";
        habi = "";
        final = "";
        fallas = "";
        aprove = "";
      }
    }
  }

  return registro;
};
