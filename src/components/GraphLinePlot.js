import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
// import accessToElectricityData from '../assets/WorldBank-AccessToElectricity.csv';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import testDataXY from '../assets/Test-Data-xy.csv'
import c3 from 'c3'
import './GraphPieDonut.css';
import Papa from 'papaparse';


class GraphLinePlot extends Component {

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
        <h2 className="chart-title">
          File Being Graphed: {this.props.name} </h2>
        <h4 className="chart-title"> Chart Type: {this.props.chartType} </h4>
        <div id="chart2"></div>
      </div>
    );
  }

}

export default GraphLinePlot ;
