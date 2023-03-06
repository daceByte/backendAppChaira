/**
 * Obtiene el registro extendido de chaira, pasando las credenciales.
 *
 * @param {JSON} [data]
 * @returns {JSON} [Registro Extendido]
 */
module.exports = async function (data) {
  const {
    getPuppeteer,
    closePuppeteer,
    setLogin,
    setView,
  } = require("../util/index");
  const browser = await getPuppeteer();
  const { extractRegisterExtend } = require("../extractors/index");

  if (!browser) {
    return {
      error: 503,
      content: "No se pudo conectar con el servidor de chaira...",
    };
  }

  let page = await setLogin(browser, data);

  if (page != false) {
    if ((await setView(page, 6)) != false) {
      try {
        const iframe = await page.waitForSelector("#Window3530_8388608_IFrame");
        const frame = await iframe.contentFrame();
        await frame.waitForSelector(".x-panel-body-noborder");
        const registerExtend = await frame.evaluate(
          () => document.querySelector(".x-panel-body-noborder").innerHTML
        );
        await closePuppeteer(browser);
        return extractRegisterExtend(registerExtend);
      } catch (error) {
        console.log("Error de registerExtend -> " + error);
        await closePuppeteer(browser);
        return {
          error: 500,
          content: "Ocurrio un error interno...",
        };
      }
    }
  }

  await closePuppeteer(browser);
  return {
    error: 401,
    content: "No se pudo hacer login, Error en credenciales.",
  };
};
