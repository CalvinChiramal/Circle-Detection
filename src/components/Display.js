import React from 'react';
import {Button} from '@material-ui/core';

/* global cv */

export const Loading = () => {
  return (
    <div className="loading">
      <img className="loadingImg" src={require('../images/loading.gif')} alt="loading"/>
      <span>Loading resources</span>
    </div>
  )
}

export class MainDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {image:null, detecting: false};
  }

  circleDetect = () => {
    this.setState({detecting:true});
    let srcMat = cv.imread('output');
    let displayMat = srcMat.clone();
    let circlesMat = new cv.Mat();  

    cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY);
    cv.HoughCircles(srcMat, circlesMat, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);

    for (let i = 0; i < circlesMat.cols; ++i) {
      let x = circlesMat.data32F[i * 3];
      let y = circlesMat.data32F[i * 3 + 1];
      let radius = circlesMat.data32F[i * 3 + 2];
      let center = new cv.Point(x, y);
      cv.circle(displayMat, center, radius, [255, 0, 0, 255], 3);
    }
    cv.imshow('output', displayMat);

    srcMat.delete();
    displayMat.delete();
    circlesMat.delete();
  }

  clearCanvas = () => {
    let image = cv.imread('image');
    cv.imshow('output', image);
    this.setState({detecting:false});
  }
  
  onChangeHandler = (event) => {
    this.setState({image:URL.createObjectURL(event.target.files[0])})
    document.getElementById("detect").style.visibility="visible";
  }

  onLoadHandler = (event) => {
    let image = cv.imread(event.target.id);
    cv.imshow('output', image);
  }
  
  render(props) {
    return (
      <div>
        <label className="upload" htmlFor="uploadPhoto">
          <input id="uploadPhoto" className="uploadPhoto" type="file" accept="image/*" onChange={this.onChangeHandler}
          />
          <Button color="primary" variant="contained" component="span">
            Upload Image
          </Button>
        </label>

        <div className="detect" id="detect">
          <Button color="primary" disabled={this.state.detecting} variant="contained" onClick={this.circleDetect}>
            Detect Circles
          </Button>
          <Button color="primary" variant="contained" onClick={this.clearCanvas}>
            Clear
          </Button>
        </div>


        <div className="images">
          {/* eslint-disable-next-line */}
          <img className="image" id="image" src={this.state.image} onLoad={this.onLoadHandler}/>
          {/* eslint-disable-next-line */}
          <canvas className="output" id="output"/>
        </div>
      </div>
    )
  }
} 