import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class ChartTypeDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    var chartOptions = [
      { value: "Pie", label: "Pie Chart"},
      { value: "Donut", label: "Donut Chart"},
      { value: "Line", label: "Line Plot"},
      { value: "Bar", label: "Bar Chart"},
    ];

      return (
      <div>
        <section className="chart-type-selector">
          <h3 className="heading"> Select chart Type:</h3>
          <Select
            name="Chart-Type"
            placeholder="chart type..."
            value={this.props.chartType}
            options={chartOptions}
            onChange={val => this.props.onChartSelect(val.value)}
            />
        </section>
      </div>
    )

  }
}

export default ChartTypeDropdown;
