/**
 * Realiza cancelaciones de materias.
 *
 * @param {JSON} [data]
 * @returns {JSON} [response]
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

  if (page != false) {
    if ((await view(page, 3)) != false) {
      try {
        const iframe = await page.waitForSelector("#Window3886_512_IFrame");
        const frame = await iframe.contentFrame();
        await frame.addScriptTag({
          url: "https://code.jquery.com/jquery-3.2.1.min.js",
        });
        await frame.addScriptTag({
          content:
            'function ocultar(){Ext.Msg.hide({title:"Notificación",buttons:Ext.Msg.OK,msg:"Para continuar con el Proceso, por favor selecccione el periodo académico."});$("#ext-gen55").click();$(".x-combo-selected").click();}',
        });

        await frame.addScriptTag({
          content:
            'function getMateriaDelete(){return "' + data.materia + '";}',
        });
        await frame.waitForSelector("#ext-gen432");
        const cityProcendence = await frame.evaluate(() => ocultar());

        await frame.waitForSelector(".x-grid-group");
        await frame.evaluate(() => {
          var x = document.querySelectorAll(".x-grid-group");
          for (let xE of x) {
            xE.classList.remove("x-grid-group-collapsed");
          }
        });

        await frame.waitForSelector("#Texcancelacion");
        await frame.type("#Texcancelacion", data.motivo);

        await frame.evaluate(() => {
          console.log("AQUI: " + getMateriaDelete());
          let x = document.querySelectorAll(
              ".x-grid-group-title .group-row-imagecommand-cell"
            ),
            index = 0;
          for (let xE of x) {
            if (xE.innerHTML == getMateriaDelete()) {
              break;
            }
            index++;
          }
          (x = document.querySelectorAll(".x-grid-group-title .icon-delete")),
            (indexDos = 0);
          for (let xE of x) {
            if (indexDos == index) {
              xE.click();
              break;
            }
            indexDos++;
          }
        });

        const btn_cancel = await page.waitForSelector("#ext-gen424");
        await btn_cancel.click();

        await closePuppeteer(browser);
        return {
          response: true,
          content:
            "Se cancelo la materia " + data.materia + " correctamente...",
        };
      } catch (error) {
        console.log("Error en cancellations -> " + error);
        await closePuppeteer(browser);
        return { error: 503, content: "No se pudo cancelar la materia..." };
      }
    } else {
      return {
        error: 502,
        content: "Error al cargar su peticion en el servidor.",
      };
    }
  }

  await closePuppeteer(browser);
  return false;
};
