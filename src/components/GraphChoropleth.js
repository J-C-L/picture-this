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


    // console.log(populationCSV);
    //populationCSV is the imported csv file
    d3.csv(populationCSV, function(data) {
      // console.log(data);

      //get array of the relevant data field
      var dataValues = data.map(function(val){
        return val.visited;
      });
      // console.log(dataValues);

      var dataMax = Math.max.apply(null, dataValues);
      var dataMin = Math.min.apply(null, dataValues);
      var dataRange = dataMax - dataMin;

      //preparing data to be mapped to 6 colors
      var colorDomainArray = [];
      for (var i = 0; i< 6; i++){
        var value = dataMin + (dataRange/6)* i;
        colorDomainArray.push(value);
      }

        // console.log(colorDomainArray);


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
