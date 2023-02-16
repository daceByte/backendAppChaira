/**
 * Verifica que se pueda hacer login en chaira.
 *
 * @param {JSON} [data]
 * @returns {JSON} [DataLogin]
 */
module.exports = async function setLogin(data) {
  const browser = require("../Utils/browser"),
    login = require("../Utils/login"),
    instanceBrowser = await browser.startBrowser();

  if (instanceBrowser == null) {
    return false;
  }

  let page = await login(instanceBrowser, data);

  if (page != false) {
    await instanceBrowser.close();
    return true;
  }

  if (instanceBrowser != null) {
    await instanceBrowser.close();
  }
  return false;
};
