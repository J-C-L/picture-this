import React from 'react';
import './App.css';
import GraphPieDonut from './GraphPieDonut';
import GraphBar from './GraphBar';
import GraphLinePlot from './GraphLinePlot';
import GraphChoropleth from './GraphChoropleth';
import UploadScreen from './UploadScreen';
import ChartTypeDropdown from './ChartTypeDropdown';


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

  renderChartTypeDropdown(){
    if (this.state.dataToGraph){
      return(
        <ChartTypeDropdown chartType={this.state.chartType}
          onChartSelect={chartType => this.setState({chartType})}/>
      )
    }
  }

  renderChart(dataToGraph, chartType, name){
    if (dataToGraph && (chartType==='Pie'|| chartType==='Donut')){
      return (
        <GraphPieDonut dataToGraph={dataToGraph} name={name} chartType={chartType} />
      )
    }else if(dataToGraph && chartType==='Bar'){
      return (
        <GraphBar dataToGraph={dataToGraph} name={name} chartType={chartType} />
      )
    }else if(dataToGraph && chartType==='Line'){
      return(
        <GraphLinePlot dataToGraph={dataToGraph} name={this.state.fileName} chartType={chartType} />
      )
    }else if(dataToGraph && chartType==='Choropleth'){
      return(
        <GraphChoropleth dataToGraph={dataToGraph} name={this.state.fileName} chartType={chartType} />
      )
    }
  }


  render() {
    return (
      <div>
        <header>
          <img src={require("../assets/pieChartYum3.png")} alt={"picture of pie called pie chart"} className="pie" />

          <div className='main-title-section'>
            <h1 className='main-title'> PICTURE IT! </h1>
            <h3 className='main-title'> A fun, easy way to make your data come to life... </h3>
            <h5 className='main-title'> A capstone project by Janice Lichtman </h5>

          </div>
          <img src={require("../assets/barChartDrinks3.png")} alt={"bar chart of liquor bottles"} className="liquor" />

        </header>

        <div className="upload-and-chartType">
          <UploadScreen onFileUpload= { (dataToGraph, fileName)=> this.onFileUpload(dataToGraph, fileName) } />

          {this.renderChartTypeDropdown()}
        </div>

        {this.renderChart(this.state.dataToGraph, this.state.chartType, this.state.fileName)}

      </div>
    );
  }
}

export default App;
