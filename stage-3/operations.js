const onlyNumbers = (input) => {
  return input.replace(/[^0-9]/g, "");
};

const removeCurrency = (input) => {
  return input.replace(/£/g, "");
}

const fromAbbreviated = (input) => {
  const symbolPow = (index = 0) => Math.pow(10, index * 3);
  const symbols = ["", "k", "m", "bn"];

  const numberPattern = "[+-]?([0-9]*[.])?[0-9]+";
  const symbolPattern = `${symbols.join("|")}`;
  const pattern = `^(${numberPattern})(${symbolPattern})$`;
  const regex = new RegExp(pattern);
  const match = input.match(pattern) || [];

  if (regex.test(input) && match.length > 3) {
    const symbol = match[3];
    const symbolValue = symbolPow(symbols.indexOf(symbol));
    const pureNum = Number(match[1]);
    return (pureNum * symbolValue).toString();
  } else {
    throw Error("This is not a valid input");
  }
}

module.exports = {
  onlyNumbers,
  removeCurrency,
  fromAbbreviated,
};
