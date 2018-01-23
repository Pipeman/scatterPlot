import React, { Component } from 'react';
import { ScatterplotChart } from "react-easy-chart";
import './Scatterplot.css';
import { initialState, setPoints } from "./ScatterplotStateService"

class Scatterplot extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const POINTS_URL = "https://scatterplotserver-itrvcanfvr.now.sh/points";
    let localPoints = localStorage.getItem("points");
    if (localPoints){
      this.setState(setPoints(JSON.parse(localPoints)));
    }
    fetch(POINTS_URL)
      .then(res => res.json())
      .then(({ points }) => {
        this.setState(setPoints(points));
        localStorage.setItem("points", JSON.stringify(points));
      });
  }

  componentWillUnmount() {
    localStorage.removeItem("points");
  }

  render() {
    let { points, ranges } = this.state;
    const RANGE_DIVIDER = 10;

    ranges.xDomainRange[1] += ranges.xDomainRange[1] / RANGE_DIVIDER;
    ranges.yDomainRange[1] += ranges.yDomainRange[1] / RANGE_DIVIDER;

    if(!points.length) {
      return <div>No Points at the moment. We might be fetching them.</div>;
    }

    return (
      <div className="scatterplot-container">
        <ScatterplotChart
            {...ranges}
            data={points}
            axes
            width={1000}
            height={500}
        />
      </div>
    );
  }
}

export default Scatterplot;
