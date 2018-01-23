import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Scatterplot from './Scatterplot';
import { initialState, setPoints } from './ScatterplotStateService';

const points = [{ x: 10, y: 10 }, { x: 34, y: 100 }];
const div = document.createElement('div');

beforeEach(() => {
  global.fetch = jest.fn(() => {
    return Promise.resolve({
      points,
      json() {
        return { points };
      }
    });
  });
});

it('renders without crashing', () => {
  const ScatterplotComponent = ReactDOM.render(<Scatterplot />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders No points message', () => {
  const ScatterplotComponent = renderer.create(<Scatterplot />);
  const ScatterplotComponentJSON = ScatterplotComponent.toJSON();
  expect(ScatterplotComponentJSON).toMatchSnapshot();
  expect(ScatterplotComponentJSON.children[0])
    .toBe("No Points at the moment. We might be fetching them.");
});

it('renders the chart', () => {
  const getLocalStorageSpy = jest.spyOn(localStorage, 'getItem')
    .mockImplementation(() => (JSON.stringify(points)));
  const ScatterplotComponent = renderer.create(<Scatterplot />);  
  
  expect(ScatterplotComponent.toJSON()).toMatchSnapshot();
});

it('state contains points and axes ranges', () => {
  const ScatterplotClass = new Scatterplot();
  expect(ScatterplotClass.state).toEqual(initialState);
});

it('fetch the points from the localStorage', () => {
  const getLocalStorageSpy = jest.spyOn(localStorage, 'getItem')
    .mockImplementation(() => (JSON.stringify(points)));
  const ScatterplotComponent = ReactDOM.render(<Scatterplot />, div);
  
  expect(getLocalStorageSpy).toHaveBeenCalled();
  expect(ScatterplotComponent.state.points).toEqual(points);
  ReactDOM.unmountComponentAtNode(div);
});

it('fetch the points from the url', done => {
  const getLocalStorageSpy = jest.spyOn(localStorage, 'getItem')
    .mockImplementation(() => null);
  const setLocalStorageSpy = jest.spyOn(localStorage, 'setItem')
    .mockImplementation(() => ({}));
  const ScatterplotComponent = ReactDOM.render(<Scatterplot />, div);
  
  expect(fetch).toBeCalledWith("https://scatterplotserver-itrvcanfvr.now.sh/points");
  setImmediate(() => {
    expect(ScatterplotComponent.state.points).toEqual(points);
    ReactDOM.unmountComponentAtNode(div);
    done();
  });
});

it('clears the local storage when the component unmounts', () => {
  const ScatterplotComponent = ReactDOM.render(<Scatterplot />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(localStorage.removeItem).toBeCalled();
});
