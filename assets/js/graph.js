function buildPlot1(apiReturn1) {
  state_unemployment_data = {}
  // console.log(apiReturn);

  apiReturn1.forEach((state_info) => {
    // console.log(state_info);
    if(!(state_info.state_abbr in state_unemployment_data)){
      state_unemployment_data[state_info.state_abbr] = {"file_week_ended":[state_info.file_week_ended.slice(4,16)],
      "unemployment": [state_info.insured_unemployment_rate], "state": state_info.state};
    } else{
      //console.log([state_info]);
      state_unemployment_data[state_info.state_abbr].file_week_ended.push(state_info.file_week_ended.slice(4,16));
      state_unemployment_data[state_info.state_abbr].unemployment.push(state_info.insured_unemployment_rate);
    }
  });
  // console.log("***State Unemployment Data*****");
  // console.log(state_unemployment_data);


// list of State abbreviations to iterate through and grab required plot info from state_unemployment_data object
  var stateAbbrList = Object.keys(state_unemployment_data);
  // console.log("STATESLIST");
  // console.log(stateAbbrList);

  // Set empty Array to populate the x and y axes below
  unemployment_plot = [];
  // Grab values from the response json object to build the plots
  stateAbbrList.forEach((state) => {
    //random hexcolor generator
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    state = {
      type: "scatter",
      mode: "lines",
      name: state_unemployment_data[state].state,
      x: state_unemployment_data[state].file_week_ended,
      y: state_unemployment_data[state].unemployment,
      line: {
        color: "#"+randomColor,
      },
    };

    unemployment_plot.push(state);
  });
  // console.log("*****unemployment_plot HERE******");
  // console.log(unemployment_plot);

  var layout1 = {
    title: "Insured Unemployment Rate",
    xaxis1: {
      range: [startDate],
      title: "Date",
    },
    yaxis1: {
      autorange: true,
      type: "linear",
      title: "Unemployment Rate ",
    },
  };

  Plotly.newPlot((id = "graph"), unemployment_plot, layout1);
}
