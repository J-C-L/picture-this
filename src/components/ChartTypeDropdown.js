import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class App extends React.Component {

  constructor(){
    super();
  }


  render() {
    var chartOptions = [
      { value: "pie", label: "Pie Chart"},
      { value: "donut", label: "Donut Chart"},
    ];

    return (
      if ({this.props.chartType}){
        return (
      <div>
        <section className="chart-type-selector">
          <h3 className="heading"> Chart Type:</h3>
          <Select
            name="Chart-Type"
            value={this.props.chartType}
            options={chartOptions}
            onChange={val => this. onChartSelect({val.value })}        
            />
        </section>
      </div>
    )
    }else{
      return (<div></div>)
    }
  }
}

export default ChartTypeDropdown;
