const nameList = require("../stage-1/charityNameList.json");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let urlList = [];
  let i = 0;
  //loop through all the chairy name
  for (i; i < nameList.length; i++) {
    await page.goto(
      "https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/" +
        nameList[i]
    );
    //get the URL from the govt website
    const res = await page.evaluate(
      (nameList, i) => {
        let curRes = [];
        const tagList = Array.prototype.slice.call(
          document.querySelectorAll(".govuk-table__row td a"),
          0,
          5
        );
        //inside the website
        for (let x = 0; x < 5; x++) {
          try {
            curRes.push({
              charityUrl: tagList[x].getAttribute("href"),
              charityName: tagList[x].innerText,
              success: true,
              searchTerm: nameList[i],
            });
          } catch (err) {
            curRes.push({
              charityUrl: null,
              charityName: null,
              searchTerm: nameList[i],
              success: false,
            });
            break;
          }
        }
        return curRes;
      },
      nameList,
      i
    );
    urlList.push(res);
  }

  browser.close();

  var fs = require("fs");
  fs.writeFile(
    "charityUrlList.json",
    JSON.stringify(urlList.flat()),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
})();
