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

  //wait for the cookie prompty
  await page.waitForSelector(".banner-actions-container");
  //click the button on the cookie prompty
  await page.click(".banner-actions-container button");
  //click the load more button
  await page.evaluate(() => {
    document.querySelector(".load-more button").click();
  });
  //auto scroll to the end of the website
  await autoScroll(page);

  //select all the charity name and put them into the list
  const spanEle = await page.evaluate(() => {
    const tags = document.querySelectorAll(
      ".rankings-entities-list li div yg-rankings-entity a "
    );
    let arr = [];
    tags.forEach((tag) => {
      arr.push(tag.innerText);
    });
    return arr;
  });
  nameList = spanEle.map((obj) => {
    return obj.split(/\r?\n|\r|\n/g)[1];
  });
  browser.close();
  console.log(nameList);
  //write that on the json file
  var fs = require("fs");
  fs.writeFile("charityNameList.json", JSON.stringify(nameList), function (err) {
    if (err) {
      console.log(err);
    }
  });
})();
