//Populates the summary statistics box according to the data returned
function populateSummaryStats(data) {
  d3.select("#summaryStats").text(" ");

  let stats = calculateStats(data);

  for (let [key, value] of Object.entries(stats)) {
    d3.select("#summaryStats").append("div").text(`${key} : ${value}`);
  }
}

// Takes in a data set and returns an object of relevant statistics
function calculateStats(data) {
  stats = {};

  stats[
    "State With the Most Continued Claims (Entire Set)"
  ] = getStateWithMaxContClaims(data);
  stats[
    "State with Most Continued Claims (Most Current Week)"
  ] = getStateWithMaxContClaims(filterMostRecentWeekData(data));
  stats["Average Number of New Claims"] = getAvgNewClaims(data);
  stats["Average Unemployment Rate"] = getAvgUnemploymentRate(data);
  stats["State With Highest Unemployment Rate"] = getStateWithMaxUnempRate(
    data
  );

  maxDate = filterMostRecentWeekData(data);

  return stats;
}

function getStateWithMaxContClaims(data) {
  //Get the state with the most open claims within the period.
  let allContinuedClaims = data.map((entry) => {
    return entry.continued_claims;
  });

  let maxContinuedClaim = Math.max(...allContinuedClaims);

  let maxContinuedClaimsIndex = allContinuedClaims.indexOf(maxContinuedClaim);

  return data[maxContinuedClaimsIndex].state;
}

function getAvgNewClaims(data) {
  //Get the state with the most open claims within the period.
  let allInitialClaims = data.map((entry) => {
    return entry.initial_claims;
  });

  // take an elegant sum
  const total = allInitialClaims.reduce(
    (accumulator, element) => accumulator + element,
    0
  );
  // calculate an average
  let avgInitialClaims = total / allInitialClaims.length;

  return avgInitialClaims.toFixed(2);
}

function getAvgUnemploymentRate(data) {
  //Get the state with the most open claims within the period.
  let unemploymentRate = data.map((entry) => {
    return entry.insured_unemployment_rate;
  });

  // take an elegant sum
  const total = unemploymentRate.reduce(
    (accumulator, element) => accumulator + element,
    0
  );
  // calculate an average
  let avgUnemploymentRate = total / unemploymentRate.length;

  return `${avgUnemploymentRate.toFixed(2)}%`;
}

function getStateWithMaxUnempRate(data) {
  data.sort((a, b) => (a.state > b.state ? 1 : -1));

  //Get the unemployment rate.
  let unemploymentRate = data.map((entry) => {
    return entry.insured_unemployment_rate;
  });

  //   Get all the states
  let states = data.map((entry) => {
    return entry.state;
  });

  //Define empty list to take your avg unemployment by state
  var stateAvgs = [];
  instancesOfState = 0;
  stateSum = 0;
  //Loop through unemploymentRate
  unemploymentRate.forEach((entry, index) => {
    //Increment a counter (represents total number of entries for each state)
    instancesOfState += 1;
    //Add current value to variable that holds sum of averages by state
    stateSum = stateSum + entry;

    if (states[index] != states[index + 1]) {
      //When this condition is run we are on the last entry for this state
      //Calculate your average and save it to array
      stateAvgs.push({
        state: states[index],
        avg: stateSum / instancesOfState,
      });
      // Reset counter vars
      instancesOfState = 0;
      stateSum = 0;
    }
  });

  let avgs = stateAvgs.map((entry) => {
    return entry.avg;
  });

  let maxUnemploymentRate = Math.max(...avgs);
  let maxUnemploymentRateIndex = avgs.indexOf(maxUnemploymentRate);

  return stateAvgs[maxUnemploymentRateIndex].state;
}

//Takes in the data set and returns only the elements where week filed is most recent
function filterMostRecentWeekData(data) {
  maxDate = moment(data[0].file_week_ended).format("YYYY[-]MM[-]DD");

  data.forEach((entry, i) => {
    entryDate = moment(entry.file_week_ended).format("YYYY[-]MM[-]DD");
    if (entryDate > maxDate) {
      maxDate = entryDate;
    }
  });

  filteredSet = data.filter((entry) => {
    return moment(entry.file_week_ended).format("YYYY[-]MM[-]DD") == maxDate;
  });

  return filteredSet;
}
