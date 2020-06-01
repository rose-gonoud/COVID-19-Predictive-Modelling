function buildPlot(apiReturn) {

  states_data = {}
  // console.log(apiReturn);

  apiReturn.forEach((state_info) => {
    // console.log(state_info);
    if(!(state_info.state_abbr in states_data)){
      states_data[state_info.state_abbr] = {"file_week_ended":[state_info.file_week_ended.slice(4,16)], "initial_claims": [state_info.initial_claims], "state": state_info.state};
    } else{
      //console.log([state_info]);
      states_data[state_info.state_abbr].file_week_ended.push(state_info.file_week_ended.slice(4,16));
      states_data[state_info.state_abbr].initial_claims.push(state_info.initial_claims);
    }
  });
  // console.log("STATE DATA");
  // console.log(states_data);


// list of State abbreviations to iterate through and grab required plot info from states_data object
  var statesList = Object.keys(states_data);
  // console.log("STATESLIST");
  // console.log(statesList);

  // Set empty Array to populate the x and y axes below
  plotInfo = [];
  // Grab values from the response json object to build the plots
  statesList.forEach(function(state) {
    //random hexcolor generator
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    // if(state === states_data[state].state){
      state = {
        type: "scatter",
        mode: "lines",
        name: states_data[state].state,
        x: states_data[state].file_week_ended,
        y: states_data[state].initial_claims,
        line: {
          color: "#"+randomColor,
        },
      };

      plotInfo.push(state);
  });

  // console.log("*****plotInfo HERE******");
  // console.log(plotInfo);

  // set up layout
  var layout = {
    title: "Unemployment claims",
    xaxis: {
      range: [startDate],
      title: "Date",
    },
    yaxis: {
      autorange: true,
      type: "linear",
      title: "Number of Claims",
    },
  };

  Plotly.newPlot((id = "plot"), plotInfo, layout);
}
