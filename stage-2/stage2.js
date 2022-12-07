const nameList = require("../stage-1/charityNameList.json");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  let charityUrl = [];
  let i = 0;

  //loop through all the chairy name
  for (i; i < nameList.length; i++) {
    await page.goto(
      "https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/" +
        nameList[i]
    );
    //get the URL from the govt website
    const name = await page.evaluate(
      (nameList, i) => {
        const tagList = Array.from(
          document.querySelectorAll(".govuk-table__row td a")
        );
        let urlList = [];
        for (let x = 0; x < 5; x++) {
          try {
            urlList.push(tagList[x].getAttribute("href"));
          } catch (err) {
            urlList = null;
            break;
          }
        }

        let charityNameList = [];
        for (let x = 0; x < 5; x++) {
          try {
            charityNameList.push(tagList[x].innerText);
          } catch (err) {
            charityNameList = null;
            break;
          }
        }

        return {
          charityUrl: urlList,
          charityName: charityNameList,
          searchTerm: nameList[i],
          success: false,
        };
      },
      nameList,
      i
    );
    charityUrl.push(name);
    console.log(`${((i / nameList.length) * 100).toFixed(0)}%`);
  }

  console.log(charityUrl);
  //   //compare the govt website with the YouGov website to see whether they have the same name
  charityUrl.forEach((char, index) => {
    // console.log(index, " index");

    try {
      // if (char.charityName[0] == nameList[index].toUpperCase()) {
      //   char.success = true;
      // } else {
      //   char.success = false;
      // }
      char.charityName.forEach((name) => {
        if (name == nameList[index].toUpperCase()) {
          char.success = true;
        }
      });
    } catch (err) {
      char.success = false;
    }
    // if (char.charityName[0] == nameList[index].toUpperCase()) {
    //   char.success = true;
    // } else if (char.charityName == null) {
    //   char.success = false;
    // } else {
    //   char.success = false;
    // }
  });

  // console.log(newCharityUrl);

  browser.close();

  var fs = require("fs");
  fs.writeFile(
    "charityUrlList.json",
    JSON.stringify(charityUrl),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
})();
