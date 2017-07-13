import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import UploadScreen from './components/UploadScreen';

import registerServiceWorker from './registerServiceWorker';




ReactDOM.render(<UploadScreen />, document.getElementById('root'));
registerServiceWorker();
