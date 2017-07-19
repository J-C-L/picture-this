import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class YAxisSelector extends React.Component {

  constructor(){
    super();
  }

  render() {

    var yAxisChoices = Object.keys(this.props.dataToGraph[0]);

    var chartOptions = [];

    for (var i=0; i<yAxisChoices.length; i++){
      chartOptions.push({value:yAxisChoices[i], label:yAxisChoices[i]});
    }



    return (
      <div className="xyAxisSelector">
        <section className="x-axis-selector">
          <h4 className="heading"> Which category would you like to use for your y-axis?</h4>
          <Select
            name="Y-Axis"
            value={this.props.yAxis}
            options={chartOptions}
            onChange={val => this.props.onYAxisSelect(val.value)}
            />
        </section>
      </div>
    )
  }
}

export default YAxisSelector;
