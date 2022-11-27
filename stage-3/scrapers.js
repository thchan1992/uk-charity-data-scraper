const puppeteer = require('puppeteer');

const attrToXPath = {
  charity_number: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[1]/div/div/div[2]/div[1]/span',
  status: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[1]/div/div/div[2]/div[2]/div/div[2]',
  description: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div/p',
  financial_period: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div/p',
  total_income: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/h3/div',
  total_expenditure: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[2]/h3/div',
  trustees: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[7]/div/div/div[2]/p[1]/strong',
  volunteers: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[7]/div/div/div[2]/p[2]/strong',
  char_exp_num: '/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[6]/div/div/table/tbody/tr[2]/td[3]',
}


async function scrapProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = Object.assign({}, attrToXPath);

  for (var key in attrToXPath) {
    if (attrToXPath.hasOwnProperty(key)) {
      const XPath = attrToXPath[key];

      const [el] = await page.$x(XPath);
      const content = await el.getProperty('textContent');
      const raw = await content.jsonValue();
      const formatted = raw.replace((/  |\r\n|\n|\t|\r/gm),"");
      data[key] = formatted;
    }
  }

  browser.close();

  console.log(data);
}

scrapProduct("https://register-of-charities.charitycommission.gov.uk/charity-search/-/charity-details/284934");

const result = [];


// notes:
// things to look out for:
// - charity number includes the text "Charity number: "
// - financial_period text doesn't have a space before the end of the date