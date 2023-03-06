/**
 * Solicita la vista requerida, 1) Horario, 2)Registro extendido, #)....
 * asi sucesivamente, ingresar a este metodo para saber que ID corresponde cada vista.
 * retorna true si se inyecto correctamente el JS de lo contrario retornara false.
 *
 * @param {Page} [page]
 * @param {int} [idPage]
 * @returns {boolean} [View]
 */
module.exports = async function (page, idPage) {
  switch (idPage) {
    case 1: //Horario
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window651_4096','/Chaira/View/Private/Academico/Estudiante/Horario.aspx','Horario','650','650');",
        });
      } catch (error) {
        console.log("Error Vista -> " + error);
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
        console.log("Error Vista -> " + error);
        return false;
      }
      return true;
    case 3: //Adiciones/Cancelaciones
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window3886_512','/Chaira/View/Private/Academico/Estudiante/Adiccion_CancelacionEstu.aspx','Adición/Cancelación','650','650');",
        });
      } catch (error) {
        console.log("Error Vista -> " + error);
        return false;
      }
      return true;
    case 4: //Matricula
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window3598_8192','/Chaira/View/Private/Matricula/MatriculaAntiguo.aspx','Matrícula','650','650');",
        });
      } catch (error) {
        console.log("Error Vista -> " + error);
        return false;
      }
      return true;
    case 5: //Pensum
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window3598_8192','/Chaira/View/Private/Matricula/MatriculaAntiguo.aspx','Matrícula','650','650');",
        });
      } catch (error) {
        console.log("Error Vista -> " + error);
        return false;
      }
      return true;
    case 6: //Registro extendido
      try {
        await page.addScriptTag({
          content:
            "DynamicWindow(Desktop1,'Window3530_8388608','/Chaira/View/Private/Academico/Notas/Registroextendido.aspx','Registro Extendido','650','650');",
        });
      } catch (error) {
        console.log("Error Vista -> " + error);
        return false;
      }
      return true;
    default:
      return false;
  }
};
