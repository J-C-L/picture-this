import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class ChartTypeDropdown extends React.Component {

  constructor(){
    super();
  }

  render() {
    var chartOptions = [
      { value: "pie", label: "Pie Chart"},
      { value: "donut", label: "Donut Chart"},
      { value: "line", label: "Line Plot"},
    ];

      return (
      <div>
        <section className="chart-type-selector">
          <h3 className="heading"> Chart Type:</h3>
          <Select
            name="Chart-Type"
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
