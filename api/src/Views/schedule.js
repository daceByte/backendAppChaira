/**
 * Obtiene el horario de chaira, pasando las credenciales.
 * en caso de no obtener nada o haber un error, retorna false.
 *
 * @param {JSON} [data]
 * @returns {JSON} [Horario]
 */
module.exports = async function getSchedule(data) {
  const browser = require("../Utils/browser"),
    login = require("../Utils/login"),
    view = require("../Utils/view"),
    instanceBrowser = await browser.startBrowser();

  if (instanceBrowser == null) {
    return {error: 503, content: "No se pudo instanciar conexion con chaira..."};
  }

  let page = await login(instanceBrowser, data);

  if (page != false) {
    if ((await view(page, 1)) == true) {
      let horario = [];
      let materia = "",
        lunes = "",
        martes = "",
        miercoles = "",
        jueves = "",
        viernes = "",
        sabado = "",
        domingo = "";
      try {
        const iframe = await page.waitForSelector("#Window651_4096_IFrame");
        const frame = await iframe.contentFrame();
        await frame.waitForSelector("#GridHorario");
        const texto = await frame.evaluate(
          () => document.querySelector("#GridHorario").innerHTML
        );
        let x = texto;
        x = x.split("<");
        for (let i = 0; i < x.length; i++) {
          if (
            x[i].includes('x-grid3-col-MATE_CODIGOMATERIA" unselectable="on">')
          ) {
            for (let o = i + 1; o < x.length; o++) {
              if (x[o].includes("div>")) {
                break;
              }
              materia += x[o].replace("br>", " ");
            }
          } else if (
            x[i].includes('class="x-grid3-cell-inner x-grid3-col-Martes"')
          ) {
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
          } else if (
            x[i].includes('class="x-grid3-cell-inner x-grid3-col-Lunes"')
          ) {
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
          } else if (
            x[i].includes('class="x-grid3-cell-inner x-grid3-col-Jueves"')
          ) {
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
          } else if (
            x[i].includes('class="x-grid3-cell-inner x-grid3-col-Sabado"')
          ) {
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
      } catch (error) {
        console.log("Error -> " + error);
        if (instanceBrowser != null) {
          await instanceBrowser.close();
        }
        return {error: 500, content: "No se pudo obtener la informacion del horario..."};
      }
      await instanceBrowser.close();
      return horario;
    }else{
      return {error: 502, content: "Error al cargar su peticion en el servidor."};
    }
  }

  if (instanceBrowser != null) {
    await instanceBrowser.close();
  }
  return {error: 500, content: "No se pudo hacer login. Error en credenciales."};
};
