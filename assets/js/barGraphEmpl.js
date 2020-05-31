function buildBarGraph(graphData){


  summedCountyData = {};
  console.log("******graphData*******");
  //console.log(graphData);
  //
  graphData.forEach((item) => {

    if(item.state_abbr){ //filter out null values for state_abbr
      if(!(item.state_abbr in summedCountyData)){ //start building summedCountyData object by checking if item.stat_abbr exists in it
        summedCountyData[item.state_abbr] = [];
      }


      if(!item.name){//another null check; returned API data has two values for "name" (item.name & item.county_name)
        if(!(item.county_name in summedCountyData)){//item.name is not defined in state object, so item.county_name must be
          summedCountyData[item.state_abbr].push({"name":item.county_name, "unemployment":item.total_unemployed});
        }
      } else if(!(item.name in summedCountyData)){ //item.name is defined in the returned object for this state
        summedCountyData[item.state_abbr].push({"name":item.name, "unemployment":item.total_unemployed});
      }
    }

  });


  //
  console.log("######## Summed unemployment DATA ############");
  //console.log(summed_unemployment_data);
  console.log(summedCountyData);

  //list of State abbreviations to iterate through and grab required plot info from state_unemployment_data object
  var stateAbbrList = Object.keys(summedCountyData);
  //console.log(stateAbbrList);
  //var unemployment_rate = Object.values(summed_unemployment_data);

  let data_input = [];

  stateAbbrList.forEach((state) => {
    // if(state === "AK"){
    summedCountyData[state].forEach((county) => {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      //console.log(`${state} : ${county.name}`);
      //let stateID = `${state}${incrementer}`;

      let trace =
        {
          x: [state],
          y: [county.unemployment],
          name: county.name,
          marker: {color:"#"+randomColor},
          hoverinfo: "name",
          type: 'bar'
        };
      //console.log(trace_name);
      data_input.push(trace);


    });

  //}

  });


  console.log("****data input list****")
  //console.log(data_input);


  var data = data_input;
  //console.log(data);

  var layout = {barmode: 'stack', showlegend:false, xaxis:{tickangle: -45},hovermode:'closest'};

  Plotly.newPlot(id='graph', data, layout);
}
