import React from 'react';
import {Button} from '@material-ui/core';

/* global cv */

export const Loading = () => {
  return (
    <div className="loading">
      <img src={require('../images/loading.gif')} alt="loading"/>
      <span>Loading resources</span>
    </div>
  )
}

export class MainDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {image:null}
  }
  
  onChangeHandler = (event) => {
    this.setState({image:URL.createObjectURL(event.target.files[0])})
    document.getElementById("detect").style.visibility="visible";
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
          <Button color="primary" variant="contained">
            Detect Circles
          </Button>
        </div>


        <div className="images">
          {/* eslint-disable-next-line */}
          <img className="image" src={this.state.image}/>
          {/* eslint-disable-next-line */}
          <img className="output" src={this.state.image}/>
        </div>
      </div>
    )
  }
} 