import puppeteer from "puppeteer";
const salsaServices = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://el-bicho-v2.glitch.me/");
    await page.setViewport({ width: 1920, height: 1080 });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

export{
    salsaServices
}