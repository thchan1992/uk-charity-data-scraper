const puppeteer = require('puppeteer');

const { dataMap } = require("./dataMap.js");

async function scrapCharityByUrl(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = Object.assign({}, dataMap);

  for (var key in data) {
    const obj = data[key];
    const { siteXPath } = obj;

    try {
      // puppeteer functions to get raw value from website
      const [el] = await page.$x(siteXPath);
      const content = await el.getProperty("textContent");
      const raw = await content.jsonValue();
      // cleaning found content
      const formatted = raw.replace(/  |\r\n|\n|\t|\r/gm, "");
      var processed = formatted;
      // performing attribute specific operations
      if (obj.hasOwnProperty("operations")) {
        obj["preprocessed"] = formatted;
        obj["operations"].forEach((func) => {
          processed = func(processed);
        });
      }
      // adding final processed value as the de facto value for this attribute
      obj["value"] = processed;
    } catch (err) {
      console.log(key + " => " + err);
      obj["value"] = null;
    }
  }

  // removing non-necessary data
  for (var key in data) {
    delete data[key]["siteXPath"];
    delete data[key]["operations"];
  }

  browser.close();

  // console.log(data);
  return data;
}

module.exports = {
  scrapCharityByUrl,
};
