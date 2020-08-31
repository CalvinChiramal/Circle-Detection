import React from 'react';
import './App.css';

/* global cv */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cvLoaded:false}
  }

  onScriptLoad = () => {
    this.setState({cvLoaded:true});
    console.log(cv.imread+'is a success');
  }
  
  componentDidMount() {
    this.script = document.createElement("script");
    this.script.src = '/utils/opencv.js';
    this.script.async = true;
    this.script.onload = () => this.onScriptLoad();
    document.body.appendChild(this.script);
  }
  componentWillUnmount() {
    this.setState({cvLoaded:false});
  }

  render() {
    return (
      <div>
        {this.state.cvLoaded ? <div>Loaded</div>: <div>Loading resources</div>}
      </div>
    )
  }
}

export default App;
