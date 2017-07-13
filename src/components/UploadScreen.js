import React, { Component } from 'react';
import Dropzone from 'react-dropzone';



class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      fileToBeSent:[],
    }
  }
  onDrop(acceptedFiles, rejectedFiles) {

    var fileToBeSent=this.state.fileToBeSent;
    fileToBeSent.push(acceptedFiles);
    this.setState({fileToBeSent});

    var filePreview=[];
    for(var i in fileToBeSent){
      filePreview.push(<div>
        {fileToBeSent[i][0].name}

        </div>
      )
    }
      this.setState({fileToBeSent,filePreview});
      console.log(this.state.fileToBeSent[0]);
  }

    render() {
      return (
        <div className="Upload">
        <Dropzone onDrop={(files) => this.onDrop(files)}>
        <div>Drag your data file here, or click to select file to upload.</div>
        </Dropzone>
        <div>
        File to be uploaded is:
        {this.state.filePreview}
        </div>
        </div>
      )
    }
  }

  export default UploadScreen;
