export const initialState = {
  points: [],
  ranges: {
    xDomainRange:[0,0],
    yDomainRange:[0,0],
  },
};

export const setPoints = points => (state = initialState) => {    
    let data = points.map((point) => ({ x: parseFloat(point.x), y: parseFloat(point.y) }));
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