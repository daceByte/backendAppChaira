/**
 * Cierra el titiritero para liberar memoria en el servidor.
 * en caso de fallar retorna false.
 *
 * @returns {boolean}
 */
module.exports = async function (browser) {
  try {
    await browser.close();
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};
