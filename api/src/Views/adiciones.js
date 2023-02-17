/**
 * Verifica que se pueda hacer login en chaira.
 *
 * @param {JSON} [data]
 * @returns {JSON} [DataLogin]
 */
module.exports = async function setAdiciones(data) {
  const browser = require("../Utils/browser"),
    login = require("../Utils/login"),
    instanceBrowser = await browser.startBrowser();

  if (instanceBrowser == null) {
    return false;
  }

  let page = await login(instanceBrowser, data);

  if (page != false) {
    if ((await view(page, 3)) == true) {
      try {
        const iframe = await page.waitForSelector("#Window3886_512_IFrame");
        const frame = await iframe.contentFrame();
        let btn_ingresar = await frame.waitForSelector("#ext-gen422");
        await btn_ingresar.click();
        btn_ingresar = await frame.waitForSelector("#ext-gen55");
        await btn_ingresar.click();
        btn_ingresar = await frame.waitForSelector(".x-combo-selected");
        await btn_ingresar.click();
        const texto = await frame.evaluate(
          () => document.querySelector("#ext-gen114").innerHTML
        );

        await instanceBrowser.close();
        return texto;
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
