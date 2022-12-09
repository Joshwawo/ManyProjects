import puppeteer from "puppeteer";
import jsdom from "jsdom";
import path from "path";
import fs, { link } from "fs";
import timer from "node:timers/promises";

import { getRandomName } from "../helpers/randomName";

const globalDirectory = path.join(__dirname, "../media/scrapImg/");


const liftServices =async () => {
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
  
}

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

    const browser = await puppeteer.launch({ headless: false });
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
    console.log(salesWeek);
    await browser.close();
    return salesWeek;
    // return fSearch;
  } catch (error) {
    console.log(error);
  }
};

const blobtoBase64 = async (blob: any) => {
  const video = path.join(__dirname, "../media/videos/HLSPlaylist.m3u8");
  return video;
};

const boilerPlate = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto("http://books.toscrape.com/index.html");
    const body = await response?.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom

    // document
    //   .querySelectorAll(".row .product_price .availability")
    //   .forEach((element) =>
    //     available.push(element.textContent?.replace(/\s/g, ""))
    //   );

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

const deviantArt = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(`https://www.deviantart.com/search?q=lol`);
    const body = await response?.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    //Selectores
    const titleSelector = "div._34lVt > div._1_xnD._2CXRr > a > h2";
    const imgSelector = "._3_LJY img";
    const creatorSelector = "div._12zhi.nRNm- > a > span._2EfV7";
    const starsSelector =
      "div._1_xnD._29VhR._2AuZJ > button > span:nth-child(2)";

    ///Variables
    const titles: (string | null)[] = [];
    const stars: (string | null)[] = [];
    const creator: (string | null)[] = [];
    const images: (string | null)[] = [];

    document
      .querySelectorAll(titleSelector)
      .forEach((Element) => titles.push(Element.textContent));
    document
      .querySelectorAll(creatorSelector)
      .forEach((Element) => creator.push(Element.textContent));
    document
      .querySelectorAll(starsSelector)
      .forEach((Element) => stars.push(Element.textContent));
    document
      .querySelectorAll(imgSelector)
      .forEach((element: any) => images.push(element.src));

    const postScrap = titles.map((post, index) => {
      return {
        title: post,
        creator: creator[index],
        stars: stars[index],
        images: images[index],
      };
    });
    // Cerramos el puppeteer
    await browser.close();
    return postScrap;
  } catch (error) {
    console.error(error);
  }
};
const deviantArtPaginationServices = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1400 });
    const response = await page.goto(`https://www.deviantart.com/search?q=lol`);
    const body = await response?.text();
    const directory = path.join(__dirname, "../media/devianArt/");

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const {
      window: { document },
    } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    //Selectores
    const titleSelector = "div._34lVt > div._1_xnD._2CXRr > a > h2";
    const imgSelector = "._3_LJY img";
    const creatorSelector = "div._12zhi.nRNm- > a > span._2EfV7";
    const starsSelector =
      "div._1_xnD._29VhR._2AuZJ > button > span:nth-child(2)";
    const paginationSelector =
      "#root > div.hs1JI > div > div._3WsM9 > div > div > div._2-0my > div > a";

    ///Variables
    const titles: (string | null)[] = [];
    const stars: (string | null)[] = [];
    const creator: (string | null)[] = [];
    const images: (string | null)[] = [];

    const selectors = () => {
      document
        .querySelectorAll(titleSelector)
        .forEach((Element) => titles.push(Element.textContent));
      document
        .querySelectorAll(creatorSelector)
        .forEach((Element) => creator.push(Element.textContent));
      document
        .querySelectorAll(starsSelector)
        .forEach((Element) => stars.push(Element.textContent));
      document
        .querySelectorAll(imgSelector)
        .forEach((element: any) => images.push(element.src));
    };

    selectors();

    // Cerramos el puppeteer

    await page.waitForSelector(paginationSelector);
    await page.click(paginationSelector);
    console.log("Entre al timer");
    await timer.setTimeout(1500);
    console.log("Salí del timer");
    await page.screenshot({
      path: `${directory}${getRandomName()}.jpg`,
      fullPage: false,
    });

    const postScrap = titles.map((post, index) => {
      return {
        title: post,
        creator: creator[index],
        stars: stars[index],
        images: images[index],
      };
    });

    await browser.close();
    return postScrap;
  } catch (error) {
    console.error(error);
  }
};
const testWDom = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com");
    await page.setViewport({ width: 1920, height: 1080 });
    await page.screenshot({
      path: `${globalDirectory}${getRandomName()}.jpg`,
      fullPage: false,
    });
    let scrapedData: any = [];

    async function scrapeCurrentPage(): Promise<any> {
      await page.waitForSelector(".page_inner");
      let urls;
      try {
        urls = await page.$$eval("section ol > li", (links) => {
          // Make sure the book to be scraped is in stock
          links = links.filter(
            (link) =>
              link.querySelector(".instock.availability > i")?.textContent !==
              "In stock"
          );
          // Extract the links from the data
          links = links.map((el: any) => el.querySelector("h3 > a")?.href);
          return links;
        });
      } catch (error) {
        console.log(error);
        console.log('No hay libros en stock');
      }
      // console.log(urls);

      let pagePromise = (linkq: any) =>
        new Promise(async (resolve, reject) => {
          let dataObj: any = {};
          let newPage = await browser.newPage();
          await newPage.goto(linkq);
          dataObj["bookTitle"] = await newPage.$eval(
            ".product_main > h1",
            (text) => text.textContent
          );
          dataObj["bookPrice"] = await newPage.$eval(
            ".price_color",
            (text) => text.textContent
          );
          dataObj["noAvailable"] = await newPage.$eval(
            ".instock.availability",
            (text: any) => {
              // Strip new line and tab spaces
              text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
              // Get the number of stock available
              let regexp = /^.*\((.*)\).*$/i;
              let stockAvailable = regexp?.exec(text)?.[1].split(" ")[0];
              return stockAvailable;
            }
          );
          dataObj["imageUrl"] = await newPage.$eval(
            "#product_gallery img",
            (img) => img.src
          );
          dataObj["productType"] = await newPage.$eval(
            "#content_inner > article > table > tbody > tr:nth-child(2) > td",
            (table) => table.textContent
          );
          // dataObj["description"] = await newPage.$eval("#content_inner > article > p", (table) => table.textContent);
          dataObj["stars"] = await newPage.$eval(
            "#content_inner > article > p",
            (table) => table.textContent
          );
          dataObj["upc"] = await newPage.$eval(
            "#content_inner > article > table > tbody > tr:nth-child(1) > td",
            (table) => table.textContent
          );

          resolve(dataObj);
          await newPage.close();

          reject("Un error en la primera promesa");
        });

      urls?.map(async (url: any) => {
        try {
          let currentPageData = await pagePromise(url);
          scrapedData.push(currentPageData);
        } catch (err) {
          console.log("Aqui cayo el error");
          const error = new Error("Error");
          throw error;
        }
      });

      let nextButtonExist = false;
      try {
        // const nextButton = await page.$eval(".next > a",(element) => element.textContent);
        const href = await page.$eval(".next > a", (element) => element.href);

        //  console.log("nextButtonExist", nextButtonExist)
        //  href.search("page-10") !== -1 ? console.log("Llegué a la pagina 5") : console.log(`Siguiente pagina ${href}`)
        if (href.search("page-5") !== -1) {
          console.log("Llegué a la pagina 5");
          return;
        }

        nextButtonExist = true;
        //  console.log("nextButtonExist", nextButtonExist)
      } catch (error) {
        nextButtonExist = false;
        return;
        console.log("No more pages");
      }
      if (nextButtonExist) {
        await page.click(
          "#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a"
        );
        return scrapeCurrentPage(); // Call this function recursively
      }
      // console.log("urls", urls);
      await browser.close();
      return scrapedData;
    }
    await scrapeCurrentPage();
    return scrapedData;

    // Cerramos el puppeteer
  } catch (err) {
    console.log("Error en el testWDom");
    console.error(err);
    const error = new Error("we have an error");
    throw error;
  }
};

//200.68.180.162
//200.68.180.162
export {
  ScraBookServices,
  scraSalesLol,
  scraSalesLolTest,
  blobtoBase64,
  deviantArt,
  deviantArtPaginationServices,
  testWDom,
  liftServices
};
