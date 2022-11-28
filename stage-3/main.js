const puppeteer = require("puppeteer-extra");
const hidden = require("puppeteer-extra-plugin-stealth");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { executablePath } = require("puppeteer");

const urlList = require("../stage-2/charityUrl.json");

const { dataMap } = require("./dataMap.js");

const waitForDOMStable = (
  page,
  options={timeout: 30000, idleTime: 2000}
) =>
  page.evaluate(({timeout, idleTime}) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        observer.disconnect();
        const msg = `timeout of ${timeout} ms ` +
          "exceeded waiting for DOM to stabilize";
        reject(Error(msg));
      }, timeout);
      const observer = new MutationObserver(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(finish, idleTime);
      });
      const config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      observer.observe(document.body, config);
      const finish = () => {
        observer.disconnect();
        resolve();
      };
      let timeoutId = setTimeout(finish, idleTime);
    }),
    options
  )
;

async function main() {
  const charityDetailList = [];
  const errorList = [];

  // puppeteer setup
  puppeteer.use(hidden());
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: false,
    ignoreHTTPSErrors: true,
    executablePath: executablePath(),
  });
  const page = await browser.newPage();

  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    // making sure entry is a http
    if (url.substring(0, 4) !== "http") continue;

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await waitForDOMStable(page);

    let data = Object.assign({}, dataMap);

    for (var key in data) {
      // creating shorthand var and destructing for eased access
      let obj = data[key];
      let { siteXPath } = obj;

      try {
        // retreiving content
        var chan = siteXPath;
        let retrieved = await page.evaluate((chan) => {
          return document.evaluate(
            chan,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue.innerText;
        }, chan);

        // format and clean
        const formatted = retrieved.replace(/  |\r\n|\n|\t|\r/gm, "");
        var processed = formatted;
        if (obj.hasOwnProperty("operations")) {
          obj["preprocessed"] = formatted;
          obj["operations"].forEach((func) => {
            processed = func(processed);
          });
        }

        // set obj value
        obj["value"] = processed;
      } catch (err) {
        console.log("");
        console.error("Issue url: " + url);
        console.error("Issue key: " + key);
        console.error("Issue err: " + err);
        console.log("");
        errorList.push(key.toString());
        obj["value"] = null;
      }
    }

    // duplication of object
    charityDetailList.push(JSON.parse(JSON.stringify(data)));
  }

  browser.close();

  // removing unnecessary key/values
  charityDetailList.forEach((item) => {
    for (var key in item) {
      delete item[key]["siteXPath"];
      delete item[key]["operations"];
    }
  });

  // convert to JSON and save
  const json = JSON.stringify(charityDetailList);
  var fs = require("fs");
  fs.writeFile("charityDetails.json", json, "utf8", function (err) {
    if (err) return console.log(err);
    console.log("Successful save.");
  });

  // display breakdown of error list
  const errorCounts = {};
  for (const num of errorList) {
    errorCounts[num] = errorCounts[num] ? errorCounts[num] + 1 : 1;
  }
  console.log("Error and their occurance:");
  console.log(errorCounts);
}

main();
