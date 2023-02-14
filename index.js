const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://chaira.uniamazonia.edu.co/Chaira/Logon.aspx");
  await page.setViewport({ width: 800, height: 600 });
  await page.type("#txt_usuario", "di.cardenas");
  await page.type("#txt_password", "dace2003");
  const btn_ingresar = await page.waitForSelector("#btn_ingresar");
  await btn_ingresar.click();
  await page.waitForNavigation();
  await page.addScriptTag({
    content:
      "DynamicWindow(Desktop1,'Window651_4096','/Chaira/View/Private/Academico/Estudiante/Horario.aspx','Horario','650','650');",
  });
})();
