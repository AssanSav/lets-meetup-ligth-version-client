import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadPhoto } from "../store/usersReducer";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Button } from "react-bootstrap";

class UploadPhoto extends Component {
  constructor() {
    super();
    this.state = {
      cameraPhoto: "",
      file: "",
      userId: "",
      isCameraVisible: false,
      inputFile: "",
    }
  }

  showCamera = (e) => {
    this.setState((prevState) => ({
      isCameraVisible: !prevState.isCameraVisible,
    }));
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        file: e.target.files[0],
        userId: this.props.match.params.id,
        inputFile: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  handlePhoto = (data) => {
    this.setState({
      cameraPhoto: data,
      userId: this.props.match.params.id,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("user_id", this.state.userId);
    formData.append("camera", this.state.cameraPhoto);

    await this.props.uploadPhoto(formData).then(() => {
      this.props.history.push(
        `/my-profile/${this.props.match.params.id}`
      );
    });
  }

  render() {
    return (
      <div className="upload-photo">
        <form onSubmit={this.handleSubmit}>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <label htmlFor="file-upload" className="custom-file-upload">
              Pick from our Computer
            </label>
            <input id="file-upload" onChange={this.handleChange} type="file" />
          </div>

          {this.state.isCameraVisible && (
            <Camera onTakePhoto={this.handlePhoto} isImageMirror={false} />
          )}

          {!this.state.isCameraVisible ? (
            <div style={{ textAlign: "center" }}>
              <Button variant="outline-primary" onClick={this.showCamera}>
                Camera
              </Button>
            </div>
          ) : (
              <div style={{ textAlign: "center" }}>
                <Button variant="outline-secondary" onClick={this.showCamera}>
                  Hide Camera
              </Button>
              </div>
            )}
          {this.state.inputFile &&
            <div style={{ textAlign: "center" }}>
              <img
                style={{
                  width: "50%",
                  height: "10%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                src={this.state.inputFile}
                alt={this.state.inputFile}
              />
            </div>
          }
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button variant="outline-success" type="submit" value="Upload">
              Upload
            </Button>
          </div>
        </form>
        <br />
      </div>
    );
  }
}

export default connect(null, { uploadPhoto })(UploadPhoto);
