import { mkdir } from 'node:fs/promises';
import { Page } from 'puppeteer';

export const ensureDir = async (path: string) =>
  await mkdir(path, { recursive: true });

export const getElementText = async (selector: string, page: Page) =>
  await page.$$eval(selector, (nodes) => nodes[0].textContent?.trim());

export const scrollToBottom = async (page: Page, timeout: number) =>
  await page.evaluate(async (timeout) => {
    let scrollPosition = 0;
    let documentHeight = document.body.scrollHeight;

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight);
      await new Promise((resolve) => setTimeout(resolve, timeout));
      scrollPosition = documentHeight;
      documentHeight = document.body.scrollHeight;
    }
  }, timeout);