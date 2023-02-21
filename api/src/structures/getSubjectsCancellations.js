/**
 * Obtiene las materias cancelables.
 *
 * @param {JSON} [data]
 * @returns {JSON} [response]
 */
module.exports = async function (data) {
  const {
    getPuppeteer,
    closePuppeteer,
    setLogin,
    setView,
  } = require("../util/index");
  const { extractSubjectsCancellations } = require("../extractor/index");
  const browser = await getPuppeteer();

  if (!browser) {
    return {
      error: 503,
      content: "No se pudo instanciar conexion con chaira...",
    };
  }

  let page = await setLogin(browser, data);

  if (page != false) {
    if ((await view(page, 3)) != false) {
      try {
        const iframe = await page.waitForSelector("#Window3886_512_IFrame");
        const frame = await iframe.contentFrame();
        await frame.addScriptTag({
          url: "https://code.jquery.com/jquery-3.2.1.min.js",
        });
        await frame.addScriptTag({
          content:
            'function ocultar(){Ext.Msg.hide({title:"Notificación",buttons:Ext.Msg.OK,msg:"Para continuar con el Proceso, por favor selecccione el periodo académico."});$("#ext-gen55").click();$(".x-combo-selected").click();}',
        });

        await frame.waitForSelector("#ext-gen95");
        const texto = await frame.evaluate(
          () => document.querySelector("#ext-gen95").innerHTML
        );

        await closePuppeteer(browser);
        return {
          response: true,
          content: extractSubjectsCancellations(texto),
        };
      } catch (error) {
        console.log("Error en getCancellations -> " + error);
        await closePuppeteer(browser);
        return { error: 503, content: "No se pudo cancelar la materia..." };
      }
    } else {
      return {
        error: 502,
        content: "Error al cargar su peticion en el servidor.",
      };
    }
  }

  await closePuppeteer(browser);
  return false;
};
