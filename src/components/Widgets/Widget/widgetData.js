import wMath from "./widgetMath.js";

function timeOnMarket(realEstate) {
  return {
    header: "Average Market Age",
    data: () => wMath.averageOnMarket(realEstate),
    estateProp: "onMarket"
  };
}

function ageOfHouse(realEstate) {
  return {
    header: "Average Building Age",
    data: () => wMath.average(realEstate, "age"),
    estateProp: "age"
  };
}

function averageZestimate(realEstate) {
  return {
    header: "Average Estimate",
    data: () => wMath.average(realEstate, "zestimate"),
    estateProp: "zestimate"
  };
}

function totalValue(realEstate) {
  return {
    header: "Total Value",
    data: () => wMath.getSum(realEstate, "zestimate"),
    estateProp: "zestimate"
  };
}

function averageLotSize(realEstate) {
  const estateProp = "lotSize";
  return {
    header: "Average Lot Size",
    data: () => wMath.average(realEstate, estateProp),
    estateProp
  };
}

function averageSqFt(realEstate) {
  const estateProp = "sqFt";
  return {
    header: "Average Square Foot",
    data: () => wMath.average(realEstate, estateProp),
    estateProp
  };
}

function averageHOA(realEstate) {
  const estateProp = "hoa";
  return {
    header: "Average HOA Fees",
    data: () => wMath.average(realEstate, estateProp),
    estateProp
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
