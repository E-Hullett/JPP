import React, { Component } from 'react';
import '../../css/Jumbotron.css';

class Jumbotron extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 id="JumbtronTitle" >{this.props.title}</h1>
          <p id="JumbtronSubTitle">{this.props.subtitle}</p>
        </div>
      </div>
    );
  }
}

export default Jumbotron;

