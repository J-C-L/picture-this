import React from 'react';
import './App.css';
// import dailyShowData from '../assets/DailyShow.json';
import Graph from './Graph';
import UploadScreen from './UploadScreen';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class App extends React.Component {

  constructor(){
    super();
  }
  componentWillMount(){
    this.setState({
      dataToGraph: null,
      fileName: "",
      chartType: null
    })
  }

  onFileUpload(dataToGraph, fileName){
    this.setState({dataToGraph});
    this.setState({fileName});
  }

  render() {

    var chartOptions = [
      { value: 'pie', label: 'Pie Chart', clearableValue: false  },
      { value: 'donut', label: 'Donut Chart', clearableValue: false  },
    ];

    return (
      <div>
        <h1 className='main-title'> PICTURE IT! </h1>
        <h3 className='main-title'> An easy, fun way to make your data come to life... </h3>

        <UploadScreen onFileUpload= { (dataToGraph, fileName)=> this.onFileUpload(dataToGraph, fileName) } />

      <section className="chart-type-selector">
        <h3 className="heading"> Chart Type:</h3>
        <Select
          name="Chart-Type"
          value="pie"
          options={chartOptions}
          onChange={val => this.setState({chartType:val.value })}
          />
      </section>


        <Graph dataToGraph={this.state.dataToGraph} name={this.state.fileName} chartType={this.state.chartType} />
      </div>
    );
  }
}

export default App;
