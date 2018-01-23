import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scatterplot from './Scatterplot/Scatterplot';
import registerServiceWorker from './Scatterplot/registerServiceWorker';

ReactDOM.render(<Scatterplot />, document.getElementById('root'));
registerServiceWorker();
