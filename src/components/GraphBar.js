import React, { Component } from 'react';
import {groupBy, reduce} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import c3 from 'c3';
// import './c3.css';
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
    // creates an object of objects, where each inner object has a key of the category name, and a value that is an array of each csv data row as a js object
    const groupedData = groupBy(this.props.dataToGraph, this.state.category);

    // creates array of arrays, where each inner array has 2 values, the category name, and the frequency of occurances of that category.
    const categoryLengths = reduce(groupedData, (result, value, key) =>
    {
      result.push([key, value.length]);
      return result;
    }, []);

    // Sorts the categoryLengths array by descending frequency of occurrances
    const sortedDescCategoryLengths=categoryLengths.sort(function(a,b){
      return b[1] - a[1];
    });


    const categories =['x'];
    for (var i=0; i<categoryLengths.length; i++){
      categories.push(sortedDescCategoryLengths[i][0]);
    }

    const data=[this.state.category];
    for (var i=0; i<categoryLengths.length; i++){
      data.push(sortedDescCategoryLengths[i][1]);
    }

console.log(categories);

    c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          categories,
          data,
        ],
        type: this.props.chartType.toLowerCase(),
        // labels: true,
      },

      axis: {
        x: {
          type: 'category', // this needed to load string x value
          tick:{
            rotate: 75,
            multiline: false
          }
        },
        y:{
          label: {
            text: 'Totals',
            position: 'outer-middle'
          }
        }
      },
      tooltip: {
        contents: function (d, defaultTitleFormat, defaultValueFormat, color) {

          return (
                "<div class=\"bar-tooltip\"><p>" + categories[d[0]['index']+1] +": " + d[0].value + "</p></div>");
        }
        // show: false
      }
      // bar: {
      //   width: {
      //     ratio: 0.8 // this makes bar width 80% of length between ticks. Default is 0.6
      //   }
      // }
    });



    // c3.generate({
    //     bindto: '#chart',
    //     data: {
    //       x: 'x',
    //       columns:
    //       [['x', this.state.category]].concat(sortedDescCategoryLengths),
    //       // columns: categoryLengths,
    //       type: this.props.chartType.toLowerCase(),
    //       labels: true,
    //     },
    //     axis: {
    //       x: {
    //         type: 'category' // this needed to load string x value
    //       },
    //       y:{
    //         label: {
    //           text: 'Totals',
    //           position: 'outer-middle'
    //         }
    //       }
    //     },
    //     // tooltip: {
    //     //   show: false
    //     //   }
    //     });

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
