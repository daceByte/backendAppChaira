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
  await page.mouse.click(2, 598);
  await page.mouse.click(100, 210, { delay: 3000 });
  await page.mouse.click(414, 397, { delay: 3000 });
  await page.mouse.click(518, 487, { delay: 3000 });

})();
