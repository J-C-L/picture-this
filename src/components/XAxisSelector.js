import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class XAxisSelector extends React.Component {

  constructor(){
    super();
  }

  render() {

    var xAxisChoices = Object.keys(this.props.dataToGraph[0]);

    var chartOptions = [];

    for (var i=0; i<xAxisChoices.length; i++){
      chartOptions.push({value:xAxisChoices[i], label:xAxisChoices[i]});
    }



    return (
      <div>
        <section className="x-axis-selector">
          <h2 className="heading"> Which category would you like to use for your x-axis?</h2>
          <Select
            name="X-Axis"
            value={this.props.xAxis}
            options={chartOptions}
            onChange={val => this.props.onXAxisSelect(val.value)}
            />
        </section>
      </div>
    )
  }
}

export default XAxisSelector;
