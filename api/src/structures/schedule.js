/**
 * Obtiene el horario de chaira, pasando las credenciales.
 * en caso de no obtener nada o haber un error, retorna false.
 *
 * @param {JSON} [data]
 * @returns {JSON} [Horario]
 */
module.exports = async function (data) {
  const {
    getPuppeteer,
    closePuppeteer,
    setLogin,
    setView,
  } = require("../util/index");
  const { extractSchedule } = require("../extractor/index");
  const browser = await getPuppeteer();
  let horario = [];

  if (!browser) {
    return {
      error: 503,
      content: "No se pudo instanciar conexion con chaira...",
    };
  }

  let page = await setLogin(browser, data);

  if (page != false) {
    if ((await view(page, 1)) == true) {
      try {
        const iframe = await page.waitForSelector("#Window651_4096_IFrame");
        const frame = await iframe.contentFrame();
        await frame.waitForSelector("#GridHorario");
        const texto = await frame.evaluate(
          () => document.querySelector("#GridHorario").innerHTML
        );
        horario = extractSchedule(texto);
      } catch (error) {
        console.log("Error horario estructura -> " + error);
        await closePuppeteer(browser);
        return {
          error: 500,
          content: "Ocurrio un error interno en la api del servidor...",
        };
      }
      await closePuppeteer(browser);
      return horario;
    } else {
      await closePuppeteer(browser);
      return {
        error: 502,
        content: "Error al cargar su peticion en el servidor.",
      };
    }
  }

  await closePuppeteer(browser);
  return {
    error: 401,
    content: "No se pudo hacer login, Error en credenciales.",
  };
};
