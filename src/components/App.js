import React from 'react';
import './App.css';
import GraphPieDonut from './GraphPieDonut';
import GraphLinePlot from './GraphLinePlot';
import UploadScreen from './UploadScreen';
import ChartTypeDropdown from './ChartTypeDropdown';
import GraphD3 from './GraphD3';



class App extends React.Component {

  constructor(){
    super();
    this.state={
      dataToGraph: null,
      fileName: "",
      chartType: null
    };
  }


  onFileUpload(dataToGraph, fileName){
    this.setState({dataToGraph});
    this.setState({fileName});
    this.setState({chartType: null});
  }


  renderChart(dataToGraph, chartType, name){
    if (dataToGraph && (chartType==='Pie'|| chartType==='Donut')){
      return (
        <GraphPieDonut dataToGraph={dataToGraph} name={name} chartType={chartType} />
      )
    }else if(dataToGraph && chartType==='Line'){
      return(
        <GraphLinePlot dataToGraph={dataToGraph} name={this.state.fileName} chartType={chartType} />
      )
    }
  }


  render() {
    return (
      <div>
        <h1 className='main-title'> PICTURE IT! </h1>
        <h3 className='main-title'> An easy, fun way to make your data come to life... </h3>

        <UploadScreen onFileUpload= { (dataToGraph, fileName)=> this.onFileUpload(dataToGraph, fileName) } />

        <ChartTypeDropdown chartType={this.state.chartType}
          onChartSelect={chartType => this.setState({chartType})}/>

        {this.renderChart(this.state.dataToGraph, this.state.chartType, this.state.fileName)}

        // <GraphD3 />

      </div>
    );
  }
}

export default App;
