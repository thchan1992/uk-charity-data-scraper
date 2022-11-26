const nameList = require("../stage-1/charityName.json");
const puppeteer = require("puppeteer");
// import nameList from "./charityName.json";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let charityUrl = [];
  for (let i = 0; i < nameList.length; i++) {
    await page.goto(
      "https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/" +
        nameList[i]
    );
    const name = await page.evaluate(() => {
      const tag = document.querySelector(".govuk-table__row td a");
      try {
        return { url: tag.getAttribute("href"), name: tag.innerText };
      } catch (err) {
        return { url: "no result", name: "no result" };
      }
    });
    charityUrl.push(name);
  }

  console.log(charityUrl);

  const newCharityUrl = charityUrl.map((char, index) => {
    console.log(index, " index");
    if (char.name == nameList[index].toUpperCase()) {
      return char.url;
    } else if (char.name == "no result") {
      return nameList[index] + " - no result";
    } else {
      return char.name + " - name not match";
    }
  });

  console.log(newCharityUrl);

  var fs = require("fs");
  fs.writeFile(
    "charityUrl.Json",
    JSON.stringify(newCharityUrl),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
})();

//https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/
