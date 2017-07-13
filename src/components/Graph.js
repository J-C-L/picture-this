import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
import c3 from 'c3'

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
          type: 'pie'
        }
      });
    }
    render() {

      return <div id="chart">hi</div>;
    }


}

export default Graph;
