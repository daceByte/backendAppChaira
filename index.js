const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://chaira.uniamazonia.edu.co/Chaira/Logon.aspx");
  // other actions...
  //await browser.close();
})();
