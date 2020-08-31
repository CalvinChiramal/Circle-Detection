import React from 'react';
import './App.css';
import {Loading, MainDisplay} from '../Display';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cvLoaded:false}
  }

  onScriptLoad = () => {
    this.setState({cvLoaded:true});
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
      <div className="app">
        {this.state.cvLoaded ? <MainDisplay cvLoaded={this.state.cvLoaded}/>: <Loading/>}
      </div>
    )
  }
}

export default App;
