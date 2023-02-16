/**
 * Obtiene el horario de chaira, pasando las credenciales.
 * en caso de no obtener nada o haber un error, retorna false.
 *
 * @param {JSON} [data]
 * @returns {JSON} [Horario]
 */
module.exports = async function getHorario(data) {
  const browser = require("../Utils/browser"),
    login = require("../Utils/login"),
    view = require("../Utils/view"),
    instanceBrowser = await browser.startBrowser();

  if (instanceBrowser == null) {
    return false;
  }

  let page = await login(instanceBrowser, data);

  if (page != false) {
    if ((await view(page, 2)) == true) {
      try {
        const iframe = await page.waitForSelector("#Window10120_1024_IFrame");
        const frame = await iframe.contentFrame();
        await frame.waitForSelector("#PanelGen_IFrame");
        const iframeSub = await frame.waitForSelector("#PanelGen_IFrame");
        const frameSub = await iframeSub.contentFrame();
        await frameSub.waitForSelector(".imagenFuncionario");

        const img = await frameSub.evaluate(
          () => document.querySelector(".imagenFuncionario img").src
        );
        const typeDcm = await frameSub.evaluate(
          () => document.querySelector("#TDocumento-inputEl").value
        );
        const dcm = await frameSub.evaluate(
          () => document.querySelector("#TFDocumento-inputEl").value
        );
        const emailIns = await frameSub.evaluate(
          () => document.querySelector("#TFEmailI-inputEl").value
        ); 

        return true;
      } catch (error) {
        console.log("Error -> " + error);
        if (instanceBrowser != null) {
          await instanceBrowser.close();
        }
        return false;
      }
    }
  }

  if (instanceBrowser != null) {
    await instanceBrowser.close();
  }
  return false;
};
