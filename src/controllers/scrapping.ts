import { Request, Response } from "express";
import {
  ScraBookServices,
  scraSalesLol,
  scraSalesLolTest,
  blobtoBase64,
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
    const blob = await blobtoBase64("blob:https://www.reddit.com/4531a6ef-450b-4225-a51d-a5ec99ccd736");
    res.json(blob);
    // res.send("Hello World");
  };

const test = async (req: Request, res: Response) => {
  res.send("Hello World");
};

export { scrappingBooks, test, lolSales, lolSalesTest,blobTest };
