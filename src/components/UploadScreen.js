import React, { Component } from 'react';
import Dropzone from 'react-dropzone';



class UploadScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      fileToBeSent:[],
    }
  }
  onDrop(acceptedFile, rejectedFile) {
    var fileToBeSent=this.state.fileToBeSent;
    fileToBeSent.push(acceptedFile);
    this.setState({fileToBeSent});


    console.log(this.state.fileToBeSent)
    var filePreview=(<div>
      {fileToBeSent[0][0].name}
      </div>
    )
    this.setState({filePreview: filePreview})
    console.log(this.state.fileToBeSent[0][0].name);
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
