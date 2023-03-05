import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { getRandomName } from "../helpers/randomName";
import axios from "axios";
import {ensureDir,getElementText} from '../helpers/ensureDir'


// webpConverter.rant_permission();

const salsaServices = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://el-bicho-v2.glitch.me/");
    // await page.setViewport({ width: 1920, height: 1080 });
    // await page.screenshot({ path: "example.png" });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};

const panServices = async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://cyberdrop.me/a/THZJEIlL");
    //  const algo = await page.waitForSelector("a[href='https://cyberdrop.me/a/THZJEIlL']");
    // await page.setViewport({ width: 1920, height: 1080 });
    // await page.screenshot({ path: "example.png" });
    await page.waitForSelector("body > section");
    let imgPreview: string[] = [];

    interface elementHTMl extends HTMLElement {
      elemento: elementHTMl;
    }

    type cosa = Omit<elementHTMl, "elemento"> | undefined;

    let urls = await page.$$eval("#table > div", (links) => {
      let iconImg = links.map(
        (elemento: cosa) =>
          elemento?.querySelector<HTMLImageElement>("a img")?.src
      );
      return iconImg.filter(
        (elemento) => elemento !== undefined && elemento !== null
      );
    });
    //  sharp(img).resize(200).toFile('towebp.webp').then((data)=>console.log(data)).catch((error)=>console.log(error))
    const pathIn = path.join(__dirname, "../../towebp.jpg");
    // console.log(pathIn);
    // const image = sharp(pathIn);

    // const tinImage = async () => {
    //   const img = await sharp(`${pathIn}`)
    //     .webp({ lossless: false })
    //     .toFile(`${__dirname}/../../webp/${getRandomName()}.webp`);

    //   // console.log(img)
    //   return img;
    // };
    const arrImg = [
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
      "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
    ];
    // const res =  tinImage()
    // const urlImg =
    //   "https://fs-01.cyberdrop.cc/museum0fcum-onlyfans_3840x2880_8ca627b8aaa26f0d42386d57a569ece7-49hejwVz.jpg";
    // const response = await axios.get(urlImg, { responseType: "arraybuffer" });

    const desgImg = async () => {
      try {
        urls.map(async (url) => {
          const response = await axios.get(`${url}`, {
            responseType: "arraybuffer",
          });
          //guardar la imagen en un achivo en el servidor
          await fs.promises.writeFile(
            `${__dirname}/../../webp/${getRandomName()}.webp`,
            response.data,
            "binary"
          );
        });
      } catch (error) {
        console.log("Error al descargar la imagen");
        console.log(error);
      }
    };
    desgImg();
    // await fs.promises.writeFile(`${__dirname}/../../webp/${getRandomName()}.webp`,response.data, "binary")
    // await fs.promises.writeFile(
    //   `${__dirname}/../../webp/${getRandomName()}.webp`,
    //   response.data,
    //   "binary"
    // );
    //  console.log("restImg",resImg)

    // const img = Buffer.from(response.data, 'binary').toString('base64');
    // console.log(img)

    // const imgWebp = await image.webp({lossless:true}).toBuffer();
    // const pathOut = path.join(__dirname, "../../towebp.webp");
    // fs.writeFileSync(pathOut,imgWebp);

    // const folder = path.join(__dirname, "../../");

    await browser.close();
    return urls;
  } catch (error) {
    console.error(error);
  }
};
//?Aqui se obtiene la ruta de la imagen
const webpFolder = async (imagen: string) => {
  try {
    // Obtener la ruta completa del archivo de la imagen
    const pathIn = path.join(__dirname, `/../../webp/${imagen}`);
    console.log(pathIn)

    if(pathIn.length === 0){
      return "no hay imagenes"
    }
    // console.log(pathIn);
    return pathIn;
  } catch (error) {
    console.log(error);
  }
};

//?Aqui se obtiene la ruta de la imagen y devuelve todas las imagenes en un array
const urlsWebpFolderServices = async () => {
  try {
    const files = await fs.promises.readdir(`${__dirname}/../../webp`);
    console.log("files", files)
    const filesWebp = files.filter((file) => file.endsWith(".webp") || file.endsWith(".jpg"));
    const intertHost = filesWebp.map(
      (file) => `http://192.168.1.2:3003/agua/webp/${file}`
    );
    return intertHost;
  } catch (error) {}
};

export const urlsCiberdropFolderServices = async () => {
  try {
    const files = await fs.promises.readdir(`${__dirname}/../../ciberdrop/museum0fcum`);
    // console.log("files", files)
    const filesWebp = files.filter((file) => file.endsWith(".webp ") || file.endsWith(".jpg"));
    const intertHost = filesWebp.map(
      (file) => `http://192.168.1.2:3003/agua/papa/${file}`
    );
    return intertHost;
  } catch (error) {
    throw new Error("Error al obtener las imagenes");
  }
};

export const ciberDropFolder = async (imagen: string) => {
  try {
    // Obtener la ruta completa del archivo de la imagen
    const pathIn = path.join(__dirname, `/../../ciberdrop/museum0fcum/${imagen}`);
    console.log("pathIn",pathIn)
    // console.log(pathIn);
    return pathIn;
  } catch (error) {
    console.log(error);
  }
};
const webpFolder2 = async (imagen: string) => {
  try {
    // Obtener la ruta completa del archivo de la imagen
    const pathIn = path.join(__dirname, `/../../webp/${imagen}`);
    console.log(pathIn)

    if(pathIn.length === 0){
      return "no hay imagenes"
    }
    // console.log(pathIn);
    return pathIn;
  } catch (error) {
    console.log(error);
  }
};

const convertAnyToWebp = async (gallery: string) => {
  try {
    //si la carpeta no existe la crea
    if (!fs.existsSync(`${__dirname}/../../webp`)) {
      fs.mkdirSync(`${__dirname}/../../webp`);
    }

    console.log("gallert", gallery);
    // const start = Date.now();
    // const arrImg: string[] = [
    //   "https://fs-01.cyberdrop.to/museum0fcum-onlyfans_3024x4032_7259817fac95674cbc64e8ffeef58026-AkpV3pX5.jpg",
    //   "https://fs-01.cyberdrop.to/museum0fcum-onlyfans_3456x5184_5746c2715ddc6532120746c63126d681-2Vrct4zN.jpg",
    //   "https://fs-01.cyberdrop.cc/museum0fcum-onlyfans_3840x2880_8ca627b8aaa26f0d42386d57a569ece7-49hejwVz.jpg",
    // ];
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://cyberdrop.me/a/${gallery}`);

    //  const algo = await page.waitForSelector("a[href='https://cyberdrop.me/a/THZJEIlL']");
    // await page.setViewport({ width: 1920, height: 1080 });
    // await page.screenshot({ path: "example.png" });
    await page.waitForSelector("body > section");
    let imgPreview: string[] = [];

    interface elementHTMl extends HTMLElement {
      elemento: elementHTMl;
    }

    type cosa = Omit<elementHTMl, "elemento"> | undefined;

    // let urls = await page.$$eval("#table > div", (links) => {
    //   let iconImg = links.map(
    //     (elemento: cosa) =>
    //       elemento?.querySelector<HTMLImageElement>("a img")?.src
    //   );
    //   return iconImg.filter(
    //     (elemento) => elemento !== undefined && elemento !== null
    //   );
    // });

    let urlAHref = await page.$$eval("#table > div", (links) => {
      let iconImg = links.map(
        (elemento: cosa) =>
          elemento?.querySelector<HTMLAnchorElement>("a")?.href
      );
      return iconImg.filter(
        (elemento) =>
          (elemento !== undefined &&
            elemento !== null &&
            elemento.endsWith(".jpg")) ||
          elemento?.endsWith(".png") ||
          elemento?.endsWith(".jpeg") ||
          elemento?.endsWith(".webp") ||
          elemento?.endsWith(".gif")
      );
    });

    console.log(urlAHref);

    // let cortado = urlAHref.slice(0, 2)
    // console.log(cortado)

    //?Aqui empieza la manera una de hacer es hacer  llamar a todas mas imagenes  y iterarlas con un for
    //!Tiempo de descarga de imagenes   20.64s || 14.87
    const responses = await Promise.all(
      urlAHref.map((link) =>
        axios.get(`${link}`, { responseType: "arraybuffer" })
      )
    );
    // console.log(` Tiempo de descarga de imagenes   ${(Date.now() - start) / 1000}s`)
    //iterar sobbre cada una de las respues de descarga de imagenes
    for (const response of responses) {
      //instancia de sharp
      const imgSharp = sharp(response.data);
      //convertir a webp
      const intoWebp = await imgSharp.webp().toBuffer();
      //guardar la imagen en un achivo en el servidor
      await fs.promises.writeFile(
        `${__dirname}/../../webp/${getRandomName()}.webp`,
        intoWebp
      );
    }
    // for (const link of urlAHref) {
    //   const response = await axios.get(String(link), { responseType: "arraybuffer" });
    //   //   //instancia de sharp
    //   const imgSharp = sharp(response.data);
    //   //   //convertir a webp
    //   const intoWebp = await imgSharp.webp().toBuffer();
    //   //   //guardar la imagen en un achivo en el servidor
    //   await fs.promises.writeFile(
    //     `${__dirname}/../../webp/${getRandomName()}.webp`,
    //     intoWebp
    //   );
    // }

    //*Aqui termina la manera dos de hacer es hacer  llamar una imagenes  y iterarlas con un for
  } catch (error) {
    console.log(error);
    const err = new Error("Error al convertir a webp");
    throw err;
  }
};

/**
 * @deprecated esta version solo tiene mas fallos que la otra asi que no la usare mas 
 */

const anotherOne = async () => {
  // if (!fs.existsSync(`${__dirname}/../../ciberdrop`)) {
  //   fs.mkdirSync(`${__dirname}/../../ciberdrop`);
  // }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    ignoreHTTPSErrors:true,
  });
  const page = await browser.newPage();
 
  const BASE_URL = 'https://cyberdrop.me/';
  // await page.goto(`https://cyberdrop.me/a/zEXMUqQA`);

  const identifier = (
    await page.evaluate(() => window.location.pathname)
  ).substring(3);
  // const title = await page.$eval("#title", (title) => title.textContent);
  const filesNames = await page.$$eval(".image > img",(image)=>image.map((img)=>img.getAttribute("alt")))
  const filesUrls = await page.$$eval(".image > img",(image)=>image.map((img)=>img.getAttribute("src")))

  const ciberPath = `${__dirname}/../../ciberdrop/(${identifier})`;
  await ensureDir(ciberPath);
  let downloadedFilesCounter  = 0;

  for (const fileName of filesNames ){
    downloadedFilesCounter++;
    if (fs.existsSync(`${path}/${fileName}`)) continue;

    //? let link = `${BASE_URL}${identifier}/${fileName}`;
    let link:(string| undefined) = `${BASE_URL}${fileName}`;
    if(fileName?.endsWith(".mp4")){
      await page.goto(`${BASE_URL}${fileName}`);
      link = await page.evaluate(() => document?.querySelector<HTMLSourceElement>('source')?.src);
    }
    const response = await fetch(String(link));
    const buffer = await response.arrayBuffer();
    console.log(`Descargado ${downloadedFilesCounter} de ${filesUrls.length}`)
    fs.writeFile(`${path}/${fileName}`, Buffer.from(buffer), (err) => {
      if (err)
        throw err;
      console.log('The file has been saved!');
    });

    // const 
    

    
    // await fs.writeFile(`${path}/${fileName}`, Buffer.from(buffer));
    
    
  }

  // for (const [index, url] of filesUrls.entries()) {
  //   const file = await axios.get(String(url), { responseType: "arraybuffer" });
  //   const fileName = filesNames[index];
  //   const filePath = `${ciberPath}/${fileName}`;
  //   await fs.promises.writeFile(filePath, file.data);
  //   downloadedFilesCounter++;
  //   console.log(`Descargado ${downloadedFilesCounter} de ${filesUrls.length}`)

  // }

  await browser.close();
  // const cyberDropFles =  ``

  
  
}


export {
  salsaServices,
  panServices,
  webpFolder,
  urlsWebpFolderServices,
  convertAnyToWebp,
  anotherOne,
  
};

// const imageWebp = async (url:string)=>{
//   const pathIn = path.join(__dirname, "../../towebp.jpg");
//   const image = sharp(pathIn);
//   const imgWebp = await image.webp({lossless:true}).toBuffer();
//   const pathOut = path.join(__dirname, "../../towebp.webp");
//   fs.writeFileSync(pathOut,imgWebp);
// }

// const example = async () => {
//   try {
//     // Abrimos una instancia del puppeteer y accedemos a la url de google
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: ["--no-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.goto("http://books.toscrape.com");
//     //  const algo = await page.waitForSelector("a[href='https://cyberdrop.me/a/THZJEIlL']");
//     // await page.setViewport({ width: 1920, height: 1080 });
//     // await page.screenshot({ path: "example.png" });
//     await page.waitForSelector(".page_inner");

//     // let element

//     // let urls = await page.$$eval('section ol > li',(links)=>{
//     //   links.map((ele:HTMLImageElement)=>ele?.querySelector('h3 > a')?.src)

//     // })
//     // console.log(urls)

//     await browser.close();
//   } catch (error) {
//     console.error(error);
//   }
// };
//args: ["--no-sandbox", "--disable-setuid-sandbox"],
//
