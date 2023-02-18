/**
 * Inicia sesion en chaira con las credenciales pasadas por el parametro data.
 * en caso de fallar retoma false.
 *
 * @param {JSON} [data]
 * @param {puppeteer} [browser]
 * @returns {page}[Pagina]
 */
module.exports = async function sendLogin(browser, data) {
  let page;
  try {
    page = await browser.newPage();
    await page.goto("https://chaira.uniamazonia.edu.co/Chaira/Logon.aspx");
    await page.setViewport({ width: 800, height: 600 });
    await page.type("#txt_usuario", data.user);
    await page.type("#txt_password", data.pass);
    const btn_ingresar = await page.waitForSelector("#btn_ingresar");
    await btn_ingresar.click();
    await page.waitForNavigation();
  } catch (error) {
    console.log("Error -> " + error);
    if (browser != null) {
      await browser.close();
    }
    return false;
  }
  return page;
};
