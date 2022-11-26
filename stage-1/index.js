const puppeteer = require("puppeteer");

//Auto Scroll
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://yougov.co.uk/ratings/politics/popularity/charities-organisations/all"
  );

  await page.waitForSelector(".banner-actions-container");
  await page.click(".banner-actions-container button");
  await page.evaluate(() => {
    document.querySelector(".load-more button").click();
  });
  await autoScroll(page);

  //select all the charity name and put them into the list
  const spanEle = await page.evaluate(() => {
    const tags = document.querySelectorAll(
      ".rankings-entities-list li div yg-rankings-entity a "
    );
    let arr = [];
    tags.forEach((tag) => {
      arr.push(tag.innerText);
      //   console.log(typeof tag.innerHTML);
    });
    return arr;
  });
  nameList = spanEle.map((obj) => {
    return obj.split(/\r?\n|\r|\n/g)[1];
  });
  console.log(nameList);

  var fs = require("fs");
  fs.writeFile("charityName.Json", JSON.stringify(nameList), function (err) {
    if (err) {
      console.log(err);
    }
  });

  // let charityUrl = [];
  // for (let i = 0; i < nameList.length; i++) {
  //   await page.goto(
  //     "https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/" +
  //       nameList[i]
  //   );
  //   const name = await page.evaluate(() => {
  //     const tag = document.querySelector(".govuk-table__row td a");
  //     try {
  //       return { url: tag.getAttribute("href"), name: tag.innerText };
  //     } catch (err) {
  //       return { url: "no result", name: "no result" };
  //     }
  //   });
  //   charityUrl.push(name);
  // }

  // //compare both list and see if the charity name is the same as the one on the charity list.

  // console.log(charityUrl);

  // const newCharityUrl = charityUrl.map((char, index) => {
  //   console.log(index, " index");
  //   if (char.name == nameList[index].toUpperCase()) {
  //     return char.url;
  //   } else if (char.name == "no result") {
  //     return char.name + " - no result";
  //   } else {
  //     return char.name + " - name not match";
  //   }
  // });

  // console.log(newCharityUrl);

  //working
  //   await page.goto(
  //     "https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/" +
  //       newName[0]
  //   );
  //   const xname = await page.evaluate(() => {
  //     const pgTag = document.querySelector(".govuk-table__row td a");
  //     let nameList = [];
  //     return pgTag.getAttribute("href");
  //   });
  //   console.log(xname);
})();

//https://register-of-charities.charitycommission.gov.uk/charity-search/-/results/page/1/delta/20/keywords/
