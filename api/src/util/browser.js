/**
 * Enciende el titiritero para iniciar las acciones.
 * en caso de fallar retorna false.
 *
 * @returns {puppeteer}
 */
module.exports = async function () {
  const puppeteer = require("puppeteer");
  let browser;
  try {
    console.log("Abriendo el navegador......");
    browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox"],
      headless: true,
    });
  } catch (err) {
    console.log("No se pudo crear una instancia de navegador => : ", err);
    return false;
  }
  return browser;
};
