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

    console.log(this.props.dataToGraph);

    c3.generate({
      bindto: '#chart2',
      data: {
        x: 'x',
        columns: [
          ['x', 30, 50, 100, 230, 300, 310],
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 300, 200, 300, 250, 450]
        ]
      }
    });
  }

  render() {
    return (
      <div>
    <p>Here's the line cahrt:</p>
    <div id="chart2"></div>
    </div>
    );
  }

}

export default GraphTimeSeries ;
