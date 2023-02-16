const puppeteer = require("puppeteer");

/**
 * Enciende el titiritero para iniciar las acciones.
 * en caso de fallar retorna false.
 *
 * @returns {puppeteer}
 */
async function startBrowser() {
  let browser;
  try {
    console.log("Abriendo el navegador......");
    browser = await puppeteer.launch({
      headless: false,
    });
  } catch (err) {
    console.log("No se pudo crear una instancia de navegador => : ", err);
    return false;
  }
  return browser;
}

async function closeBrowser() {
  await browser.close();
}

module.exports = {
  startBrowser,
  closeBrowser,
};
