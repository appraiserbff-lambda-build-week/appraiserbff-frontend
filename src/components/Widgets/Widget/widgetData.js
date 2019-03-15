import wMath from "./widgetMath.js";

function timeOnMarket(realEstate) {
  return {
    header: "Average Market Age",
    data: () => wMath.averageOnMarket(realEstate),
    estateProp: "onMarket",
    short: "Market Age"
  };
}

function ageOfHouse(realEstate) {
  return {
    header: "Average Building Age",
    data: () => wMath.average(realEstate, "age"),
    estateProp: "age",
    short: "Building Age"
  };
}

function averageZestimate(realEstate) {
  return {
    header: "Average Estimate",
    data: () => wMath.average(realEstate, "zestimate"),
    estateProp: "zestimate",
    short: "Estimate"
  };
}

function totalValue(realEstate) {
  return {
    header: "Estimate Sum",
    data: () => wMath.getSum(realEstate, "zestimate"),
    estateProp: "zestimate",
    short: "Estimate Sum"
  };
}

function averageLotSize(realEstate) {
  const estateProp = "lotSize";
  return {
    header: "Average Lot Size",
    data: () => wMath.average(realEstate, estateProp),
    estateProp,
    short: "Lot Size"
  };
}

function averageSqFt(realEstate) {
  const estateProp = "sqFt";
  return {
    header: "Average Square Foot",
    data: () => wMath.average(realEstate, estateProp),
    estateProp,
    short: "Square Foot"
  };
}

function averageHOA(realEstate) {
  const estateProp = "hoa";
  return {
    header: "Average HOA Fees",
    data: () => wMath.average(realEstate, estateProp),
    estateProp,
    short: "HOA Fees"
  };
}

export default {
  timeOnMarket,
  ageOfHouse,
  averageZestimate,
  totalValue,
  averageLotSize,
  averageSqFt,
  averageHOA
};
