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
      this.props.onYAxisSelect(value)
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
          <h4 className="heading"> Which field(s) would you like to graph?</h4>
          <Select
            name="Y-Axis"
            value={this.state.value}
            placeholder="y-axis data..."
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
