const puppeteer = require("puppeteer");

const urlList = require("../stage-2/charityUrl.json");

const { scrapCharityByUrl } = require("./scrapCharityByUrl.js");

async function main() {
  // // step 1: initialise list
  // const charityDetailList = [];

  // // step 2: scrap charity with dedicated function
  // for (let i = 0; i < urlList.length; i++) {
  //   const url = urlList[i];
  //   if (url.substring(0, 4) !== "http") continue;
  //   // #TODO: scrapCharityByUrl
  // }

  // // step 3: convert to JSON and save
  // const json = JSON.stringify(charityDetailList);
  // var fs = require("fs");
  // fs.writeFile("charityDetails.json", json, "utf8", function (err) {
  //   if (err) return console.log(err);
  //   console.log("Successful save.");
  // });

  //
  // BELOW
  //

  const res1 = await scrapCharityByUrl(
    "https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/3968381"
  );
  const res2 = await scrapCharityByUrl(
    "https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/284934"
  );
  const res3 = await scrapCharityByUrl(
    "https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/3987102"
  );
  console.log({
    res1,
    res2,
    res3
  });

  // console.log(res1);
}

main();
