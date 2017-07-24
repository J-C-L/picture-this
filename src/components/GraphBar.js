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


    const categoryLengths = reduce(groupedData, (result, value, key) =>
    {
      result.push([key, value.length]);
      return result;
    }, []);

    console.log(categoryLengths);

    const categories =['x'];
    for (var i=0; i<categoryLengths.length; i++){
      categories.push(categoryLengths[i][0]);
    }

    const data=[this.state.category];
    for (var i=0; i<categoryLengths.length; i++){
      data.push(categoryLengths[i][1]);
    }

    console.log(categoryLengths);
    console.log(categories);
    console.log(data);

    // c3.generate({
    //   bindto: '#chart',
    //   data: {
    //     x: 'x',
    //     columns: [
    //       categories,
    //       data,
    //     ],
    //     type: this.props.chartType.toLowerCase(),
    //     labels: true,
    //   },
    //
    //   axis: {
    //     x: {
    //       type: 'category' // this needed to load string x value
    //     },
    //     y:{
    //       label: {
    //         text: 'Totals',
    //         position: 'outer-middle'
    //       }
    //     }
    //   },
    //   // bar: {
    //   //   width: {
    //   //     ratio: 0.8 // this makes bar width 80% of length between ticks. Default is 0.6
    //   //   }
    //   // }
    //   });



      c3.generate({
        bindto: '#chart',
        data: {

          x: 'x',
            columns:
            [['x', this.state.category]].concat(categoryLengths)  ,
          // columns: categoryLengths,
          type: this.props.chartType.toLowerCase(),
          labels: true
        },
        axis: {
            x: {
              type: 'category' // this needed to load string x value
            },
            y:{
              label: {
                text: 'Totals',
                position: 'outer-middle'
              }
            }
          }
      });



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
            <div id="chart"></div>
          </div>
        )
      }
    }
  }

  export default GraphBar;
