import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
// import accessToElectricityData from '../assets/WorldBank-AccessToElectricity.csv';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import testDataXY from '../assets/Test-Data-xy.csv';
import c3 from 'c3';
import './Graph.css';
import XAxisSelector from './XAxisSelector';
import YAxisSelector from './YAxisSelector';
import Papa from 'papaparse';


class GraphLinePlot extends Component {
  constructor(){
    super();
    this.state={
      xAxis: null,
      yAxis: null,
    };
  }

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {

    if (!this.state.xAxis || !this.state.yAxis){
      return;
    }else{
      var key1 = this.state.xAxis;
      // var key1 = Object.keys(this.props.dataToGraph[0])[0];
      var xValues = ['x']
      var arrayXValues = this.props.dataToGraph.map(function(obj){
        return obj[key1];
      });
      xValues =  xValues.concat(arrayXValues);

      var key2 = this.state.yAxis;
      // var key2 = Object.keys(this.props.dataToGraph[0])[1]
      var yValues =[key2];
      var arrayYValues = this.props.dataToGraph.map(function(obj){
        return obj[key2];
      });
      yValues =  yValues.concat(arrayYValues);

      var yValues2 = yValues.map(function(val){
        return (2*val + 50)
      });


      c3.generate({
        bindto: '#chart2',
        data: {
          x: 'x',
          columns: [
            xValues,
            yValues,
            yValues2
          ]
        },
        //Wnpm install --save react-c3jsant to normaliza scale based on xy-values
        // size: {
        //   width: 400,
        //   height: 400
        // }
      });

      console.log(this.state.xAxis);
      console.log(this.state.yAxis);
      console.log(xValues);
      console.log(yValues);
    }
  }


  render() {

    if (!this.state.xAxis){
      return(
        <XAxisSelector
          xAxis={this.state.xAxis} dataToGraph={this.props.dataToGraph} onXAxisSelect={xAxis => this.setState({xAxis})} />
      )
    }else if(!this.state.yAxis) {
      return(
        <div>
          <XAxisSelector
            xAxis={this.state.xAxis} dataToGraph={this.props.dataToGraph} onXAxisSelect={xAxis => this.setState({xAxis})} />

          <YAxisSelector
            yAxis={this.state.yAxis} dataToGraph={this.props.dataToGraph} onYAxisSelect={yAxis => this.setState({yAxis})} />
        </div>
      )
    }else{
      return (
        <div>

          <XAxisSelector
            xAxis={this.state.xAxis} dataToGraph={this.props.dataToGraph} onXAxisSelect={xAxis => this.setState({xAxis})} />

          <YAxisSelector
            yAxis={this.state.yAxis} dataToGraph={this.props.dataToGraph} onYAxisSelect={yAxis => this.setState({yAxis})} />

          <h2 className="chart-title">
            File Being Graphed: {this.props.name} </h2>
          <h4 className="chart-title"> Chart Type: {this.props.chartType} </h4>
          <div id="chart2"></div>
        </div>
      );
    }
  }
}

export default GraphLinePlot ;
