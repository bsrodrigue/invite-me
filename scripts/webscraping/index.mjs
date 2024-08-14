import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

const url = "https://oblador.github.io/react-native-vector-icons/";

async function scrapeIconData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.waitForSelector('.Container');

  const content = await page.evaluate(() => {
    return document.querySelector('.Container').innerHTML;
  });

  const $ = cheerio.load(content);

  const families = {};

  $('div.Result-Row').each((_idx, el) => {
    const family = $(el).find('h2').text().trim();

    families[family] = [];
    const container = $(el).find('div.Result-Icon-Container');

    $(container).each((_idx, el) => {
      const title = $(el).find('h4').text().trim();
      families[family].push(title);
    });
  });

  writeFileSync('src/constants/icon_data.json', JSON.stringify(families, null, 2));

  await browser.close();
}

scrapeIconData();
