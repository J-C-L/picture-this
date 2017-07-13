import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
import c3 from 'c3'
import './Graph.css';

//_ is a common symbol for lodash, so could use
// import _ from 'lodash';

class Graph extends Component {

    componentDidMount() {
      this.updateChart();
    }
    componentDidUpdate() {
      this.updateChart();
    }
    updateChart() {
      const groupedData = groupBy(this.props.data, 'Group');

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
        <h2 className="chart-title"> {this.props.name} </h2>
        <h4 className="chart-title"> {this.props.chartType.toUpperCase() + ' CHART'} </h4>
        <div id="chart"></div>
        <div id="chart2"></div>
        </div>)
    }


}

export default Graph;
