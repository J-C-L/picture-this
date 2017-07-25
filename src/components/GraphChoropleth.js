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


        console.log(USstatesJSON);



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
