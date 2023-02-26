/**
 * Recibe el html del horario de la pagina chaira y lo extrae
 * para organizarlo en JSON.
 *
 * @param {String} [html]
 * @returns {JSON} [Horario]
 */
module.exports = function (texto, program) {
  if (texto == "" || texto == null) {
    return {
      error: 500,
      content: "No se pudo procesar el horario correctamente...",
    };
  }

  let horario = [];
  let materia = "",
    lunes = "",
    martes = "",
    miercoles = "",
    jueves = "",
    viernes = "",
    sabado = "",
    domingo = "";

  let x = texto;
  x = x.split("<");
  for (let i = 0; i < x.length; i++) {
    if (x[i].includes('x-grid3-col-MATE_CODIGOMATERIA" unselectable="on">')) {
      for (let o = i + 1; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        materia += x[o].replace("br>", " ");
      }
    } else if (x[i].includes('class="x-grid3-cell-inner x-grid3-col-Martes"')) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        martes += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Martes" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (x[i].includes('class="x-grid3-cell-inner x-grid3-col-Lunes"')) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        lunes += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Lunes" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (
      x[i].includes('class="x-grid3-cell-inner x-grid3-col-Miercoles"')
    ) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        miercoles += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Miercoles" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (x[i].includes('class="x-grid3-cell-inner x-grid3-col-Jueves"')) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        jueves += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Jueves" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (
      x[i].includes('class="x-grid3-cell-inner x-grid3-col-Viernes"')
    ) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        viernes += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Viernes" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (x[i].includes('class="x-grid3-cell-inner x-grid3-col-Sabado"')) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        sabado += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Sabado" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }
    } else if (
      x[i].includes('class="x-grid3-cell-inner x-grid3-col-Domingo"')
    ) {
      for (let o = i; o < x.length; o++) {
        if (x[o].includes("div>")) {
          break;
        }
        domingo += x[o]
          .replace("br>", " ")
          .replace(
            'div class="x-grid3-cell-inner x-grid3-col-Domingo" unselectable="on">',
            ""
          )
          .replace("&nbsp;", "");
      }

      horario.push({
        name: materia,
        lunes: lunes,
        martes: martes,
        miercoles: miercoles,
        jueves: jueves,
        viernes: viernes,
        sabado: sabado,
        domingo: domingo,
        program: program,
      });
      materia = "";
      lunes = "";
      martes = "";
      miercoles = "";
      jueves = "";
      viernes = "";
      sabado = "";
      domingo = "";
    }
  }

  return horario;
};
