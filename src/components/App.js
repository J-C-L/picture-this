import React from 'react';
import './App.css';
// import dailyShowData from '../assets/DailyShow.json';
import Graph from './Graph';
import GraphTimeSeries from './GraphTimeSeries';
import UploadScreen from './UploadScreen';
import ChartTypeDropdown from './ChartTypeDropdown';



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


  renderChart(dataToGraph, chartType){
    if (dataToGraph && (chartType=='pie'|| chartType=='donut')){
      return (
        <Graph dataToGraph={dataToGraph} name={this.state.fileName} chartType={chartType} />
      )
    }else if(dataToGraph && chartType=='scatter'){
      return(
        <GraphTimeSeries dataToGraph={dataToGraph} name={this.state.fileName} chartType={chartType} />
      )
    }
  }


  render() {
    return (
      <div>
        <h1 className='main-title'> PICTURE IT! </h1>
        <h3 className='main-title'> An easy, fun way to make your data come to life... </h3>

        <UploadScreen onFileUpload= { (dataToGraph, fileName)=> this.onFileUpload(dataToGraph, fileName) } />

        {console.log(this.state.dataToGraph)}
        
        <ChartTypeDropdown chartType={this.state.chartType}
          onChartSelect={chartType => this.setState({chartType})}/>

        {this.renderChart(this.state.dataToGraph, this.state.chartType)}

      </div>
    );
  }
}

export default App;
