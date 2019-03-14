function average(realEstate, key) {
  // Works for keys: zestimate, certainty
  return Math.round(getSum(realEstate, key) / realEstate.length);
}

function averageAge(realEstate) {
  // Return average age of homes
  const avgYr = average(realEstate, "built");
  return new Date().getFullYear() - avgYr;
}

function averageOnMarket(realEstate) {
  const totalTime = realEstate.reduce((acc, estate) => {
    const dateOnMarket = new Date(estate.onMarket);
    const timeOnMarket = new Date() - dateOnMarket;
    return acc + timeOnMarket;
  }, 0);
  const ms = Math.round(totalTime / realEstate.length);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function getSum(realEstate, key) {
  return realEstate.reduce((acc, estate) => acc + estate[key], 0);
}

export default { average, averageAge, averageOnMarket, getSum };
