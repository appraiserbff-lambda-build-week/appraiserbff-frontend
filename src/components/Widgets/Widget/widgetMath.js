function average(realEstate, key) {
  // Works for keys: zestimate, certainty
  return Math.round(_getSum(realEstate, key) / realEstate.length);
}

function averageAge(realEstate) {
  // Return average age of homes
  const avgYr = average(realEstate, "built");
  return new Date().getFullYear() - avgYr;
}

function averageOnMarket(realEstate) {
  const totalTime = realEstate.reduce((acc, estate) => {
    const onMarket = new Date(estate.onMarket);
    const timeOnMarket = new Date() - onMarket;
    return acc + timeOnMarket;
  }, 0);
  const ms = Math.round(totalTime / realEstate.length);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function _getSum(realEstate, key) {
  return realEstate.reduce((acc, estate) => acc + estate[key], 0);
}

export default { average, averageAge, averageOnMarket };
