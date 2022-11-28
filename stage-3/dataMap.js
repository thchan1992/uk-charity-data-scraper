const {
  onlyNumbers,
  removeCurrency,
  fromAbbreviated,
} = require("./operations.js");

const dataMap = {
  //
  //  GENERAL
  //
  id: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[1]/div/div/div[2]/div[1]/span",
    operations: [onlyNumbers],
  },
  description: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div/p",
  },
  status: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[1]/div/div/div[2]/div[2]/div/div[2]",
  },

  // //
  // //  INCOME
  // //
  incomeTotal: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/h3/div",
    operations: [onlyNumbers],
  },
  incomeDonationsAndLegacies: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[1]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  incomeCharitableActivities: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[2]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  incomeOtherTradingActivities: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[3]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  incomeInvestments: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[4]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  incomeOther: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[5]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },

  //
  //  EXPENDITURE
  //
  expenditureTotal: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[2]/h3/div",
    operations: [onlyNumbers],
  },
  expenditureRaisingFunds: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[2]/table/tbody/tr[1]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  expenditureCharitableActivities: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[2]/table/tbody/tr[2]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  expenditureOther: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[3]/div[2]/table/tbody/tr[3]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },

  //
  //  CHARITABLE EXPENDITURE
  //
  charitableExpenditureIncomeGenerationAndGovernance: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[6]/div/div[1]/table/tbody/tr[1]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  charitableExpenditureCharitableExpenditure: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[6]/div/div[1]/table/tbody/tr[2]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },
  charitableExpenditureRetainedForFutureUse: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[6]/div/div[1]/table/tbody/tr[3]/td[3]",
    operations: [removeCurrency, fromAbbreviated],
  },

  //
  //  ADDITIONAL FINANCE
  //
  period: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div/p",
  },
  investmentGains: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[4]/div/p[1]",
  },
  incomeBreakdown: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[4]/div/p[2]",
  },

  //
  //  PEOPLE
  //
  peopleEmployees: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[7]/div/div/div[2]/p[1]/strong",
    operations: [onlyNumbers],
  },
  peopleTrustees: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[7]/div/div/div[2]/p[2]/strong",
    operations: [onlyNumbers],
  },
  peopleVolunteers: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[7]/div/div/div[2]/p[3]/strong",
    operations: [onlyNumbers],
  },

  //
  //  MISCELLANEOUS
  //
  fundraisingNote: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[8]/div[1]/div",
  },
  tradingNote: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[8]/div[2]/div",
  },
  trusteePaymentsNote: {
    siteXPath:
      "/html/body/div[1]/div[2]/section/div[1]/div/div/div/section/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[8]/div[3]/div",
  },
};

module.exports = {
  dataMap,
};
