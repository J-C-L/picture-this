import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class YAxisSelector extends React.Component {
  constructor(props){
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state={
  		value: []
    };
  }
  handleSelectChange (value) {
  		console.log('You\'ve selected:', value);
  		this.setState({ value });
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
            value={this.state.value}
            placeholder="Select fields to graph"
            options={chartOptions}
            multi={true}
            joinValues={true}
            onChange={this.handleSelectChange}
            />

        </section>
      </div>
    )
  }
}

export default YAxisSelector;
