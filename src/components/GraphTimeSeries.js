import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
// import accessToElectricityData from '../assets/WorldBank-AccessToElectricity.csv';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import testDataXY from '../assets/Test-Data-xy.csv'
import c3 from 'c3'
import './Graph.css';
import Papa from 'papaparse';


class GraphTimeSeries extends Component {

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {


    var key2 = Object.keys(this.props.dataToGraph[0])[1]


    var yValues =[key2];
    var arrayYValues = this.props.dataToGraph.map(function(obj){
    return obj[key2];
    });

    yValues =  yValues.concat(arrayYValues);

    var key1 = Object.keys(this.props.dataToGraph[0])[0]
    var xValues = ['x']
    var arrayXValues = this.props.dataToGraph.map(function(obj){
    return obj[key1];
    });

      xValues =  xValues.concat(arrayXValues);

    c3.generate({
      bindto: '#chart2',
      data: {
        x: 'x',
        columns: [
          xValues,
          yValues

        ]
      }
    });
   }

  render() {


    return (
      <div>
    <p>Here's the line chart:</p>
    <div id="chart2"></div>
    </div>
    );
  }

}

export default GraphTimeSeries ;
