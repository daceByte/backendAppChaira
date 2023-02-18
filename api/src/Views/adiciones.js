/**
 * Verifica que se pueda hacer login en chaira.
 *
 * @param {JSON} [data]
 * @returns {JSON} [DataLogin]
 */
module.exports = async function setAdiciones(data) {
  const browser = require("../Utils/browser"),
    login = require("../Utils/login"),
    view = require("../Utils/view"),
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
        await frame.addScriptTag({
          url: "https://code.jquery.com/jquery-3.2.1.min.js",
        });
        await frame.addScriptTag({
          content:
            'function ocultar(){Ext.Msg.hide({title:"Notificación",buttons:Ext.Msg.OK,msg:"Para continuar con el Proceso, por favor selecccione el periodo académico."});$("#ext-gen55").click();$(".x-combo-selected").click();}',
        });

        let materia = "METODOLOGIA DE LA INVESTIGACION II (2 Horarios)";
        await frame.addScriptTag({
          content:
            'function getMateriaDelete(){return "'+materia+'";}',
          });
        await frame.waitForSelector("#ext-gen432");
        const cityProcendence = await frame.evaluate(() => ocultar());

        await frame.waitForSelector(".x-grid-group");
        const action = await frame.evaluate(() => {
          var x = document.querySelectorAll(".x-grid-group");
          for (let xE of x) {
            xE.classList.remove("x-grid-group-collapsed");
          }
        });

        
        const action2 = await frame.evaluate(() => {
          console.log("AQUI: " +getMateriaDelete());
          let x = document.querySelectorAll('.x-grid-group-title .group-row-imagecommand-cell'), index = 0;
          for (let xE of x) {
            if(xE.innerHTML==getMateriaDelete()){
              break;
            }
            index++;
          }
          x = document.querySelectorAll(".x-grid-group-title .icon-delete"), indexDos=0;
          for (let xE of x) {
            if(indexDos == index){
              xE.click();
              break;
            }
            indexDos++;
          }
        });


        //await instanceBrowser.close();
        return true;
      } catch (error) {
        console.log("Error -> " + error);
        if (instanceBrowser != null) {
          //await instanceBrowser.close();
        }
        return false;
      }
    }
  }

  if (instanceBrowser != null) {
    //await instanceBrowser.close();
  }
  return false;
};
