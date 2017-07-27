import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';


class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      parsedData:{},
      fileName:'',
    }
  }


  onDrop(acceptedFiles, rejectedFile) {
    var reader = new FileReader();

    reader.onload = event => {
      var dataAsJSON = Papa.parse(event.target.result, {
        header: true,
      })

      this.setState({
        fileName: acceptedFiles[0].name,
        parsedData: dataAsJSON,
      })
      this.props.onFileUpload(this.state.parsedData.data, this.state.fileName);

    }

    reader.readAsText(acceptedFiles[0])
  }


  render() {

    const dropzoneStyle= {
      width  : "100%",
      height : "130px",
      border : "2px dashed black",
      borderRadius : "5px"
    };


    var dropArea;
    if (this.state.fileName){
      dropArea = (
        <section className="dropArea">
          <Dropzone
            onDrop={(files) => this.onDrop(files)}
            style={dropzoneStyle}>
            <div>
              <strong>Successfully uploaded:</strong> {this.state.fileName}
              </div>
            </Dropzone>
          </section>
        );
      }else{
        dropArea = (
          <Dropzone onDrop={(files) => this.onDrop(files)}
            style={dropzoneStyle}>
            <div>Drag your data file here, or click to select file to upload.</div>
          </Dropzone>
        );
      }

      return (
        <div className="Upload">
          {dropArea}
        </div>
      );
    }
  }

  export default UploadScreen;
