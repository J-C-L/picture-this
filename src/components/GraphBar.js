import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import c3 from 'c3'
import './Graph.css';
import DataCategoryDropdown from './DataCategoryDropdown';



class GraphBar extends Component {
  constructor(){
    super();
    this.state={
      category: null
    };
  }


  componentDidMount() {
    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const groupedData = groupBy(this.props.dataToGraph, this.state.category);

    console.log(groupedData);
    return;
    // const columns = reduce(groupedData, (result, value, key) =>
    // {
    //   result.push([key, value.length]);
    //   return result;
    // }, []);


    // c3.generate({
    //   bindto: '#chart',
    //   data: {
    //     columns: columns,
    //     type: this.props.chartType.toLowerCase()
    //   }
    // });

  }

  render() {

    if (!this.state.category){
      return (
        <DataCategoryDropdown
          category={this.state.category} dataToGraph={this.props.dataToGraph} onCategorySelect={category => this.setState({category})} />
      )
    }else{
      return (
        <div>

          <DataCategoryDropdown
            category={this.state.category} dataToGraph={this.props.dataToGraph} onCategorySelect={category => this.setState({category})} />

          <h2 className="chart-title">
            File Being Graphed: {this.props.name} </h2>
          <h4 className="chart-title"> Chart Type: {this.props.chartType} </h4>
          <h4 className="chart-title"> Category shown: {this.state.category} </h4>
          <div id="chart">  BAR CHART WILL GO HERE     </div>
        </div>
      )
    }
  }
}

export default GraphBar;
