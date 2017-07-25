import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import d3 from 'd3';


class GraphChoropleth extends Component {

  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    // var data = [4, 8, 15, 16, 23, 42];
    //
    // d3.select("#chart-choropleth")
    //   .selectAll("div")
    //     .data(data)
    //   .enter().append("div")
    //     .attr("class", "bar")
    //     .style("width", function(d) { return d * 10 + "px"; })
    //     .text(function(d) { return d; });
    return
  }


  render() {
      return (
        <div>
          <div id="chart-choropleth"> Choropleth Chart Will Go Here</div>
        </div>
      )
    }
  }

  export default GraphChoropleth;
