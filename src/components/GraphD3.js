import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import d3 from 'd3';





class GraphD3 extends Component {

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    var data = [4, 8, 15, 16, 23, 42];

    d3.select("#chart")
      .selectAll("div")
        .data(data)
      .enter().append("div")
        .attr("class", "bar")
        .style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; });
  }
  render() {
      return (
        <div>
          <div id="chart"></div>
        </div>)
    }
  }

  export default GraphD3;
