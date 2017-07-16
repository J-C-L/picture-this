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
      dataName: "Daily Show Guests",
      chartType: "pie"
    })
  }


  render() {
    // console.log('data to graph is');
    // console.log(this.state.dataToGraph);

    return (
      <div>
      <h1 className='main-title'> PICTURE IT! </h1>
      <h3 className='main-title'> An easy, fun way to make your data come to life... </h3>

      <UploadScreen onFileUpload={dataToGraph => this.setState({dataToGraph})}    />

      <Graph data={this.state.dataToGraph} name={this.state.dataName} chartType={this.state.chartType} />
      </div>
    );
  }
}

export default App;
