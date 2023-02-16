/**
 * Solicita la vista requerida, 1) Horario, 2)Registro extendido, #)....
 * asi sucesivamente, ingresar a este metodo para saber que ID corresponde cada vista.
 * retorna true si se inyecto correctamente el JS de lo contrario retornara false.
 *
 * @param {Page} [page]
 * @param {int} [idPage]
 * @returns {boolean} [View]
 */
module.exports = async function getView(page, idPage) {
  switch (idPage) {
    case 1: //Horario
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window651_4096','/Chaira/View/Private/Academico/Estudiante/Horario.aspx','Horario','650','650');",
        });
      } catch (error) {
        console.log("Error -> " + error);
        return false;
      }
      return true;
    case 2: //Datos Personales
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window10120_1024','/Chaira/View/Private/AccesoV3/Administrativo/HojadeVida/GestionarDatosTerceroEstudiante.aspx','Datos Personales','650','650');",
        });
      } catch (error) {
        console.log("Error -> " + error);
        return false;
      }
      return true;

    default:
      return false;
  }
};