import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
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
    this.createYColums = this.createYColums.bind(this);
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


  createYColums(yAxis){

    var yColumns = [];

    for(var i=0; i<yAxis.length; i++){
      var key = yAxis[i]['value'];
      var yValues = [key];
      var arrayYValues = this.props.dataToGraph.map(function(obj){
        return obj[key];
      });
      yValues =  yValues.concat(arrayYValues);
      yColumns.push(yValues);
    }
    return yColumns;

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


      var allColumns = [xValues].concat(this.createYColums(this.state.yAxis));

      if(this.state.error) return
      try {
        c3.generate({
          bindto: '#chart2',
          data: {
            x: 'x',
            columns: allColumns
          },
          axis:{
            x: {
              label: {
                text: this.state.xAxis,
                position: 'outer-center'
              }
            },
            y:{
              label: {
                text: 'Totals',
                position: 'outer-middle'
              }
            }
          },
          legend:{
            hide: true
          },
          zoom: {
            enabled: true,
            // rescale: true
            extent: [1, 100] //default is [1, 10]
          }

          //Wnpm install --save react-c3jsant to normaliza scale based on xy-values
          // size: {
          //   width: 400,
          //   height: 400
          // }
        });
      } catch (error) {
        this.setState({error: "We're sorry. This type of graph cannot be rendered with that data."})
      }

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
            dataToGraph={this.props.dataToGraph} onYAxisSelect={yAxis => this.setState({yAxis})} />
        </div>
      )
    }else{
      return (
        <div>

          <XAxisSelector
            xAxis={this.state.xAxis} dataToGraph={this.props.dataToGraph} onXAxisSelect={xAxis => this.setState({xAxis})} />

          <YAxisSelector
            dataToGraph={this.props.dataToGraph} onYAxisSelect={yAxis => this.setState({yAxis})} />

          <h2 className="chart-title">
            File Being Graphed: {this.props.name} </h2>
          <h4 className="chart-title"> Chart Type: {this.props.chartType} </h4>
          {this.state.error && (
            <h2 className="error-message">{this.state.error}</h2>
          )}
          <div id="chart2"></div>
        </div>
      );
    }
  }
}

export default GraphLinePlot ;
