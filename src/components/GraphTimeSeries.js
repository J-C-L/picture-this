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

  // var data2 = ['data2', 130, 300, 200, 300, 250, 450];
// if (this.props.dataToGraph)
// {
//   console.log(this.props.dataToGraph);
//   console.log('hi');
//   console.log(Object.keys(this.props.dataToGraph));
   // console.log(Object.keys(this.props.dataToGraph[0]));
// }

  //   var yValues =['series'];
  //   var arrayYValues = this.props.dataToGraph.map(function(obj){
  //   return obj['y-axis'];
  //   });
  //   console.log(yValues);
  //
  //   yValues =  yValues.concat(arrayYValues);
  //
  //   c3.generate({
  //     bindto: '#chart2',
  //     data: {
  //       x: 'x',
  //       columns: [
  //         ['x', 10, 20, 30, 40, 50],
  //         yValues
  //
  //       ]
  //     }
  //   });
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
