import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scatterplot from './Scatterplot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Scatterplot />, document.getElementById('root'));
registerServiceWorker();
