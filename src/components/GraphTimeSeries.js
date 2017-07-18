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

  processData(data){
    // PapaParse creates an object with the data returned in 'data':
    var d = Papa.parse(data, { quotes: false, delimiter: ",", header: true,});
     //d = d.data;
    console.log(d);
  }

  updateChart() {
      this.processData(testDataXY);
  }



    // const groupedData = groupBy(this.props.dataToGraph, 'Group');

    // const columns = reduce(groupedData, (result, value, key) =>
    // {
    //   result.push([key, value.length]);
    //   return result;
    // }, []);

    // c3.generate({
    //   bindto: '#chart',
    //   data: {
    //     columns: columns,
    //     type: this.props.chartType
    //   }
    // });



  render() {
      return (<div> Hi </div>)
      }
  }

  export default GraphTimeSeries ;
