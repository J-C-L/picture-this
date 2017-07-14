import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';


class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      fileToBeSent:[],
      parsedData:{},
    }
  }
  onDrop(acceptedFiles, rejectedFile) {
    var reader = new FileReader();
    reader.onload = event => {
      var json = Papa.parse(event.target.result, {
        header: true,
      })
      // this.props.onSubmit({
      //   fileName: acceptedFiles[0].name,
      //   parsedData: json,
      // })
      this.setState({
        fileName: acceptedFiles[0].name,
        parsedData: json,
      })
    }
    reader.readAsText(acceptedFiles[0])

  }



  render() {
      console.log(this.state)
    return (
      <div className="Upload">
      <Dropzone onDrop={(files) => this.onDrop(files)}>
      <div>Drag your data file here, or click to select file to upload.</div>
      </Dropzone>
      <div>
      File to be uploaded is:
      {this.state.fileName}
      </div>
      </div>
    )
  }
}

export default UploadScreen;
