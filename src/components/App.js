import React from 'react';
import './App.css';
import dailyShowData from '../assets/DailyShow.json';
// import {groupBy} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import Graph from './Graph';
import UploadScreen from './UploadScreen';

class App extends React.Component {

  constructor(){
    super();
  }
  componentWillMount(){
    this.setState({
      dataToGraph: null,
      // dataToGraph: dailyShowData,
      fileName: "",
      chartType: "pie"
    })
  }

onFileUpload(dataToGraph, fileName){
  console.log(this.state.fileName);
  this.setState({dataToGraph});
  this.setState({fileName});
  console.log(this.state.fileName);
}


  render() {
    // console.log('data to graph is');
    // console.log(this.state.dataToGraph);
    return (
      <div>
      <h1 className='main-title'> PICTURE IT! </h1>
      <h3 className='main-title'> An easy, fun way to make your data come to life... </h3>

      <UploadScreen onFileUpload= { (dataToGraph, fileName)=> this.onFileUpload(dataToGraph, fileName) } />

      <Graph data={this.state.dataToGraph} name={this.state.fileName} chartType={this.state.chartType} />
      </div>
    );
  }
}

export default App;
