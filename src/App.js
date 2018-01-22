import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ScatterplotChart} from "react-easy-chart";

const initialState = {
  points: [],
  ranges: {
    xDomainRange:[0,0],
    yDomainRange:[0,0],
  },
};

const setPoints = points => (state = initialState) => {
    let data = points.map((point) => ({x: parseFloat(point.x), y: parseFloat(point.y)}));
    let ranges = { ...state.ranges };
    data.forEach((point) => {
        if (point.x < ranges.xDomainRange[0]) {
          ranges.xDomainRange[0] = point.x;
        }
        if (point.x > ranges.xDomainRange[1]) {
          ranges.xDomainRange[1] = point.x;
        }
        if (point.y < ranges.yDomainRange[0]) {
          ranges.yDomainRange[0] = point.y;
        }
        if (point.y > ranges.yDomainRange[1]) {
          ranges.yDomainRange[1] = point.y;
        }
      }
    );

    return {
      points: data,
      ranges,
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount(){
    let localPoints = localStorage.getItem("points");
    if (localPoints){
      this.setState(setPoints(JSON.parse(localPoints)));
    }
    fetch("https://scatterplotserver-itrvcanfvr.now.sh/points")
      .then((res) => res.json())
      .then(({points}) => {
        this.setState(setPoints(points));
        localStorage.setItem("points", JSON.stringify(points));
      });
  }

  render() {
    let {points, ranges} = this.state;

    ranges.xDomainRange[1] += 100;
    ranges.yDomainRange[1] += 100;

    if(!points.length)
      return <div>No Points!</div>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ScatterplotChart
            {...ranges}
            data={points}
            axes
            width={1000}
            height={500}
        />
        }
      </div>
    );
  }
}

export default App;
