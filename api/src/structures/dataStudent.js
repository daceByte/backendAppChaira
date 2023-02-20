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
  const browser = await getPuppeteer();

  if (!browser) {
    return {
      error: 503,
      content: "No se pudo instanciar conexion con chaira...",
    };
  }

  let page = await setLogin(browser, data);

  if (!page) {
    if (await setView(page, 2)) {
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
        const celular = await frameSub.evaluate(
          () => document.querySelector("#NFTelefonoFijo-inputEl").value
        );
        const nameFirst = await frameSub.evaluate(
          () => document.querySelector("#TFPrimerNombre-inputEl").value
        );
        const nameSecond = await frameSub.evaluate(
          () => document.querySelector("#TextField2-inputEl").value
        );
        const lastnameFirst = await frameSub.evaluate(
          () => document.querySelector("#TFPrimerApellido-inputEl").value
        );
        const lastnameSecond = await frameSub.evaluate(
          () => document.querySelector("#TextField4-inputEl").value
        );
        const cityProcendence = await frameSub.evaluate(
          () => document.querySelector("#oCiudadProcedencia-inputEl").value
        );
        const cityNac = await frameSub.evaluate(
          () => document.querySelector("#CCiudad-inputEl").value
        );
        const birthday = await frameSub.evaluate(
          () => document.querySelector("#DFFechaNacimiento-inputEl").value
        );
        const blood = await frameSub.evaluate(
          () => document.querySelector("#CBTipoSanguineo-inputEl").value
        );

        await closePuppeteer(browser);

        return {
          tipoDocumento: typeDcm,
          documento: dcm,
          nombre:
            nameFirst +
            " " +
            nameSecond +
            " " +
            lastnameFirst +
            " " +
            lastnameSecond,
          correo: emailIns,
          usuarioChaira: emailIns.split("@")[0],
          imagen: img,
          ciudadProcedencia: cityProcendence,
          ciudadNacimiento: cityNac,
          fechaNacimiento: birthday,
          tipoSangre: blood,
        };
      } catch (error) {
        console.log("Error de dataStudent -> " + error);
        await closePuppeteer(browser);
        return {
          error: 500,
          content: "Ocurrio un error interno en la api del servidor...",
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
