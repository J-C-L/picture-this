import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import * as d3 from 'd3';
import './Graph.css';
import USstatesJSON from '../assets/us-states.json';
import populationCSV from '../assets/USPopByState.csv';



class GraphChoropleth extends Component {

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {

    //populationCSV is the imported csv file
    d3.csv(populationCSV, function(data) {
      // console.log(data);

      //get array of the relevant data field
      var dataValues = data.map(function(val){
        return val.visited;
      });

      var dataMax = Math.max.apply(null, dataValues);
      var dataMin = Math.min.apply(null, dataValues);
      var dataRange = dataMax - dataMin;

      //preparing data to be mapped to 6 colors
      var colorDomainArray = [];
      for (var i = 0; i< 6; i++){
        var value = dataMin + (dataRange/6)* i;
        colorDomainArray.push(value);
      }

      // Define linear scale for output
      var color = d3.scale.linear()
      .range(['rgb(237,248,251)','rgb(191,211,230)','rgb(158,188,218)','rgb(140,150,198)','rgb(136,86,167)','rgb(129,15,124)'])
      .domain(colorDomainArray); // giving the input data values





        // Loop through each state data value in the .csv file
		for (var i = 0; i < data.length; i++) {

			// Grab State Name
			var dataState = data[i].state;

			// Grab data value
			var dataValue = data[i].visited;

      // Find the corresponding state inside the GeoJSON
      			for (var j = 0; j < USstatesJSON.features.length; j++)  {
      				var jsonState = USstatesJSON.features[j].properties.NAME;

      				if (dataState == jsonState) {

      					// Copy the data value into the JSON
      					USstatesJSON.features[j].properties.visited = dataValue;
      					// Stop looking through the JSON
      					break;
      				} // end of if statement
      			} //end of loop through GeoJSON
      		} // end of loop through my states data

          //PREPARE FOR USING D3

          //Width and height of map
          var width = 960;
          var height = 500;

          // D3 Projection of the US
          var projection = d3.geo.albersUsa()
          .translate([width/2, height/2])    // translate to center of screen
          .scale([1000]);          // scale things down so see entire US

          // Define path generator
          var path = d3.geo.path()  // path generator that will convert GeoJSON to SVG paths
          .projection(projection);  // tell path generator to use albersUsa projection






          // Bind the data to the SVG and create one path per GeoJSON feature
        		svg.selectAll("path")
        		.data(json.features)
        		.enter()
        		.append("path")
        		.attr("d", path)
        		.style("stroke", "#fff")
        		.style("stroke-width", "1")
        		.style("fill", function(d) {
        			// Get data value
        			var value = d.properties.visited;
        			if (value) {
        				//If value exists…
        				return color(value);
        			} else {
        				//If value is undefined…
        				return "rgb(0,0,100)";
        			}
        		}) // ends fill function







    });


    return;
  }


  render() {
    return (
      <div>
      <div id="chart-choropleth"> Choropleth Chart Will Go Here</div>
      </div>
    )
  }
}

export default GraphChoropleth;
