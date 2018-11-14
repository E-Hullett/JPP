import React from 'react';
import '../css/App.css';

//import { Router, Route} from 'react-router'
// eslint-disable-next-line
import {Router, Route, Link, HashRouter} from 'react-router-dom';

import Header from '../Uncurrent/Header'
import Main from '../Uncurrent/Main'

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
)

export default App