import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
// import topojson from 'topojson';
import './Graph.css';
import DataCategoryDropdown from './DataCategoryDropdown';
import USstatesJSON from '../assets/us-states.json';
// import populationCSV from '../assets/USPopByState.csv';


class GraphChoropleth extends Component {
  constructor(){
    super();
    this.state={
      category: null
    };
  }




  render() {

    // don't render map unti a data category has been chosen
    if (!this.state.category) {
      return (
        <DataCategoryDropdown
          category={this.state.category} dataToGraph={this.props.dataToGraph} onCategorySelect={category => this.setState({category})} />
      );

    }


    var data = this.props.dataToGraph;

console.log(data);
     var categoryValue = this.state.category
     console.log(categoryValue);
    //get array of the relevant data field
    var dataValues = data.map(function(val){
      return parseInt(val[categoryValue]);
    });
console.log(dataValues);
    var dataMax = Math.max.apply(null, dataValues);
    var dataMin = Math.min.apply(null, dataValues);
    var dataRange = dataMax - dataMin;

    //preparing data to be mapped to 6 colors
    var colorDomainArray = [];
    for (var i = 0; i< 6; i++){
      var value = dataMin + (dataRange/6)* i;
      colorDomainArray.push(value);
    }
console.log(colorDomainArray);
    // Define linear scale for color range
    var color = d3.scaleLinear()
    .range(['#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d'])
    .domain(colorDomainArray); // giving the input data values


    // Loop through each state data value in the .csv file
    for (var i = 0; i < data.length; i++) {

      // Grab State Name
      var dataState = data[i].state;

      // Grab data value
      var dataValue = data[i][categoryValue];

      // Find the corresponding state inside the GeoJSON
      for (var j = 0; j < USstatesJSON.features.length; j++)  {
        var jsonState = USstatesJSON.features[j].properties.NAME;

        if (dataState == jsonState) {

          // Copy the data value into the JSON
          USstatesJSON.features[j].properties.categoryValue = dataValue;
          // Stop looking through the JSON
          break;
        } // end of if statement
      } //end of loop through GeoJSON
    } // end of loop through my states data



    //PREPARE FOR USING D3

    //Set width and height of map
    var width = 1000,
    height = 500;

    // D3 Projection of the US
    var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);          // scale things down so see entire US

    // Define path generator
    var path = d3.geoPath()  // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection



    // Create a parentContainer, then an SVG element that state paths will be attached to,
    // and append tooltip as a sibling of that SVG (else it doesn't work, not sure why)
    // these are fake DOM nodes that ReactFauxDOM creates
    const parentContainer = new ReactFauxDOM.createElement('div')
    const node = new ReactFauxDOM.createElement('svg')
    parentContainer.appendChild(node);
    // parentContainer.appendChild(
    //       <Tooltip
    //         pageX={this.state.tooltipLeft}
    //         pageY={this.state.tooltipTop}
    //         opacity={this.state.tooltipOpacity}
    //         data={this.state.tooltipData}
    //         onClick={this.onTooltipClick}
    //         key="chart-tooltip"
    //         />
    //
    //     );

    // create the map const with the correct attributes
    const d3_map = d3.select(node)
    .attr("width", width)
    .attr("height", height);


    // Create an svg element within the map which state paths will be attached to
    const states = d3_map.append("svg")
    .attr("class", "states");

    // Bind the data to the 'g' element and create one path per GeoJSON feature
    states.selectAll("path")
    .data(USstatesJSON.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "#fff")
    .style("stroke-width", "1")
    .style("fill", function(d) {

      // Get data value
      var value = d.properties.categoryValue;
      if (value) {
        //If value exists…
        return color(value);
      } else {
        //If value is undefined…
        return "rgb(0,0,100)";
      }
    }) // end fill function



    // create the legend const and an svg element which it will be attached to
    const legend = d3.select(node)
    .append("svg:g")
    .attr("class", "legend")
    .attr("width", 300)
    .attr("height", 200)
    .attr("transform", "translate(" + 820 + "," + 340 + ")")
    .selectAll("g")
    .data(color.domain().slice().reverse())
    .enter()
    .append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * 22 + ")"; });

    legend.append("rect")
    .attr("width", 18)
    .attr("height", 22)
    .style("fill", color);

    // Get data values for the ranges to be displayed in the legned
    var legendValues = colorDomainArray.concat([dataMax]);

    // Could add in conditional formatting based on size of max values.
    // Values formatted with commas and given with no decimal places.
    var formattedLegendValues = legendValues.map(function(x){
      return d3.format(",.0f")(x);
    });
    // Values formatted in scientific notation
    // var formattedLegendValues = legendValues.map(function(x){
    // 	return d3.format(".1e")(x);
    // });

    // Reverse array, since legened is constrcuted from top/max to bottom/min
    var legendText = formattedLegendValues.reverse();
    // var legendText = legendValues.reverse();

    //loop over indices to have access to pairs of consecutive data values to be displayed in the legned
    var legendIndex = [0,1,2,3,4,5]
    legend.append("text")
    .data(legendIndex)
    .attr("x", 24)
    .attr("y", 12)
    .attr("dy", ".35em")
    .text(function(d) {
      return legendText[d+1] + '  to  ' + legendText[d]; });



      // return it all into React out of D3
      return (
        <div>
          <DataCategoryDropdown
            category={this.state.category} dataToGraph={this.props.dataToGraph} onCategorySelect={category => this.setState({category})} />

          {parentContainer.toReact()}
        </div>
      );

    }
  }

  export default GraphChoropleth;
