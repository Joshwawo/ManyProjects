import puppeteer from "puppeteer";
import jsdom from "jsdom";
import path from "path";
import fs from "fs";

import { getRandomName } from "../helpers/randomName";

const ScraBookServices = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto("http://books.toscrape.com/index.html");
    const body = await response?.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    const images: any[] = [];
    const titles: (string | null)[] = [];
    const stars: any[] = [];
    const prices: any[] = [];
    const available: any[] = [];

    document
      .querySelectorAll(".row .image_container a img")
      .forEach((element: any) =>
        images.push(`http://books.toscrape.com/${element.src}`)
      );
    document
      .querySelectorAll(".row .star-rating")
      .forEach((element) => stars.push(element.className.split(" ")[1]));

    document
      .querySelectorAll(".row .product_pod h3 a")
      .forEach((element) => titles.push(element.textContent));
    document
      .querySelectorAll(".row .product_price .price_color")
      .forEach((element) => prices.push(element.textContent));
    document
      .querySelectorAll(".row .product_price .availability")
      .forEach((element) =>
        available.push(element.textContent?.replace(/\s/g, ""))
      );

    // Cerramos el puppeteer
    const fSearch = titles.map((title, index) => ({
      title,
      image: images[index],
      price: prices[index],
      stars: stars[index],
      available: available[index],
    }));
    // console.log(fSearch);

    await browser.close();
    return fSearch;
  } catch (error) {
    console.error(error);
  }
};

const scraSalesLol = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(
      "https://www.leagueoflegends.com/es-mx/news/tags/sale/"
    );
    // const open = await page.click(".css-1h1j0y3");
    const body = await response?.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    const titles: (string | null)[] = [];
    const images: any[] = [];
    const date: any[] = [];
    const link: any[] = [];

    document
      .querySelectorAll(".style__InfoInner-sc-1h41bzo-7 h2 ")
      .forEach((element) => titles.push(element.textContent));
    document
      .querySelectorAll(".style__Img-g183su-1")
      .forEach((element: any) => images.push(element.src));
    document
      .querySelectorAll("div.style__Meta-sc-1h41bzo-10.kxUA-ds > time ")
      .forEach((element: any) => date.push(element.dateTime));
    document
      .querySelectorAll("li.style__Item-sc-106zuld-3 > a ")
      .forEach((element: any) =>
        link.push(`https://www.leagueoflegends.com${element.href}`)
      );

    const saleObJ = titles.map((title, index) => ({
      title,
      image: images[index],
      date: date[index],
      link: link[index],
    }));
    console.log(saleObJ);

    // document.querySelectorAll("div.style__Info-sc-1h41bzo-6.evyNIL > div > h2").forEach((element) =>console.log(element.textContent));
    // Cerramos el puppeteer

    // console.log(fSearch);

    await browser.close();
    return saleObJ;
  } catch (error) {
    console.log(error);
  }
};

const scraSalesLolTest = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    //headlless

    //get media/scrapImg
    const directory = path.join(__dirname, "../media/scrapImg/");
    // console.log(directory);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(
      "https://www.leagueoflegends.com/es-mx/news/tags/sale/"
    );

    // await page.screenshot({ path: `${directory}${getRandomName()}.jpg`, fullPage: false });
    const body = await response?.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    const titles: (string | null)[] = [];
    const link: any[] = [];

    //ofertas de la semana
    const salesWeek: (string | null)[] = [];
    // #gatsby-focus-wrapper > div > div > div.style__ResponsiveWrapper-yc5gg7-0.kpjNnV.style__Section-i7k9d9-0-SectionArticleHtml.jEPNOH.type-article_html > div > div:nth-child(7) > table > tbody > tr:nth-child(1) > td:nth-child(1)
    document
      .querySelectorAll("li.style__Item-sc-106zuld-3 > a")
      .forEach((element: any) =>
        link.push(`https://www.leagueoflegends.com/${element.href}`)
      );
    const firstPage = link[0];
    const response2 = await page.goto(firstPage);

    const table = await page.$(
      "#gatsby-focus-wrapper > div > div > div.style__ResponsiveWrapper-yc5gg7-0.kpjNnV.style__Section-i7k9d9-0-SectionArticleHtml.jEPNOH.type-article_html > div > p:nth-child(4)"
    );
    const rect = await table?.boundingBox();
    // console.log(rect);
    await page.mouse.wheel({ deltaY: rect?.y, deltaX: rect?.x });
    // await timer.setTimeout(100);

    await page.setViewport({ width: 1920, height: 1400 });
    await page.screenshot({
      path: `${directory}${getRandomName()}.jpg`,
      fullPage: false,
    });

    const body2 = await response2?.text();
    const {
      window: { document: document2 },
    } = new jsdom.JSDOM(body2);

    document2
      .querySelectorAll(
        `div:nth-child(7) > table > tbody > tr:nth-child(-n+3) > td`
      )
      .forEach((element) => salesWeek.push(element?.textContent));
    console.log(salesWeek[0]);

    await browser.close();
    // return fSearch;
  } catch (error) {
    console.log(error);
  }
};

const blobtoBase64 = async (blob: any) => {
  const video = path.join(__dirname, "../media/videos/HLSPlaylist.m3u8");
  return video;
};

export { ScraBookServices, scraSalesLol, scraSalesLolTest, blobtoBase64 };
