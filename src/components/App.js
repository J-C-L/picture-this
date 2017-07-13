import React, { Component } from 'react';
import './App.css';
import dailyShowData from '../assets/DailyShow.json';
import {groupBy} from 'lodash';
//_ is a common symbol for lodash, so could use
// import _ from 'lodash';
import Graph from './Graph';


class App extends Component {

  constructor(){
    super();
  }

  componentWillMount(){

    this.setState({ dailyShowData: dailyShowData,
      dataName: "Daily Show Guests",
      chartType: "pie"
      })

  }

  render() {


    return (
    <Graph data={this.state.dailyShowData} name={this.state.dataName} chartType={this.state.chartType} />
    );
  }
}

export default App;
