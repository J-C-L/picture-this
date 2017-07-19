import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import c3 from 'c3'
import './Graph.css';
import CategoryDropdown from './CategoryDropdown';




class Graph extends Component {

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const groupedData = groupBy(this.props.dataToGraph, 'Group');

    const columns = reduce(groupedData, (result, value, key) =>
    {
      result.push([key, value.length]);
      return result;
    }, []);

    c3.generate({
      bindto: '#chart',
      data: {
        columns: columns,
        type: this.props.chartType
      }
    });
  }
  render() {
    return (
      <div>

        <CategoryDropdown dataToGraph={this.props.dataToGraph} />

        <h2 className="chart-title">
          File Being Graphed: {this.props.name} </h2>
        <h4 className="chart-title"> Chart Type: {this.props.chartType.toUpperCase()} </h4>
        <div id="chart"></div>
      </div>
    )
  }
}

export default Graph;
