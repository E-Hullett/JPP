import React, {Component} from 'react';
import '../css/App.css';

//import { Router, Route} from 'react-router'
// eslint-disable-next-line
import {Router, Route, Link, HashRouter} from 'react-router-dom';


class App extends Component {
    render(){
        return(
            <div className={"App"}>
                <h1>Home page</h1>
                {console.log(this.props)}
            </div>
        )
    }
}

export default App;