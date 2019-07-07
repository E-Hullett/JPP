import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

//import App from './components/js/App';
import Routes from './routes'

ReactDOM.render((
        <Routes />
), document.getElementById('root'))

serviceWorker.unregister();



