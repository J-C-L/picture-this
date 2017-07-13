import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';


class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      fileToBeSent:[],
    }
  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles[0].name);
    var fileToBeSent=this.state.fileToBeSent;
    fileToBeSent.push(acceptedFiles);
    this.setState({fileToBeSent});

    var filePreview=[];
    for(var i in fileToBeSent){
      filePreview.push(<div>
        {fileToBeSent[i][0].name}
        <MuiThemeProvider>
        <a href="#"><FontIcon
        className="material-icons customstyle"
        color={blue500}
        styles={{ top:10,}}
        >clear</FontIcon></a>
        </MuiThemeProvider>
        </div>
      )
    }
  }

    render() {
      return (
        <div className="Upload">
        <Dropzone onDrop={(files) => this.onDrop(files)}>
        <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        </div>
      )
    }
  }

  export default UploadScreen;
