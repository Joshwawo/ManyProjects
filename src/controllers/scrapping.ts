import { Request, Response } from "express";
import {
  ScraBookServices,
  scraSalesLol,
  scraSalesLolTest,
  blobtoBase64,
  deviantArt as deviantArtServices,
  deviantArtPaginationServices,
  testWDom,
  liftServices,
} from "../services/scrapping";

const scrappingBooks = async (req: Request, res: Response) => {
  console.log("Scraping books...");
  const books = await ScraBookServices();
  res.json(books);
};

const lolSales = async (req: Request, res: Response) => {
  console.log("Scraping sales...");
  const sales = await scraSalesLol();
  res.json(sales);
};
const lolSalesTest = async (req: Request, res: Response) => {
  console.log("Scraping Test sales...");
  const sales = await scraSalesLolTest();
  res.json(sales);
};

const blobTest = async (req: Request, res: Response) => {
  const blob = await blobtoBase64(
    "blob:https://www.reddit.com/4531a6ef-450b-4225-a51d-a5ec99ccd736"
  );
  res.json(blob);
  // res.send("Hello World");
};

const deviantArt = async (req: Request, res: Response) => {
  console.log("Sraping on devianart...");
  const deviantArt = await deviantArtServices();
  res.json(deviantArt);
};
const deviantArtPagination = async (req: Request, res: Response) => {
  console.log("Sraping on devianart with pagination...");
  const deviantArt = await deviantArtPaginationServices();
  res.json(deviantArt);
};

const test = async (req: Request, res: Response) => {
  res.send("Hello World");
};

const testWDomCtrl = async (req: Request, res: Response) => {
  try {
    const test = await testWDom();
    res.json(test);
  } catch (error) {
    return res.status(500).json({ message: "we have a problem" });
  }
};

const liftCtrl = async (req: Request, res: Response) => {
  try {
    await liftServices();
    res.json({ message: "ok" });
  } catch (error) {
    return res.status(500).json({ message: "we have a problem" });
  }
};

export {
  scrappingBooks,
  test,
  lolSales,
  lolSalesTest,
  blobTest,
  deviantArt,
  deviantArtPagination,
  testWDomCtrl,
  liftCtrl,
};
