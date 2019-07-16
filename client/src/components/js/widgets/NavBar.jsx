//External imports:
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//Internal/custom imports:
import '../../css/NavBar.css';
import * as logo from '../../../images/MiniPinkDog.png';
import * as settingsGear from '../../../images/Gear.png'
//var Img = <img alt="JPP logo" src={'../../../images/Pink_Dog_Face.jpg'} />


export default class NavBar extends Component {
  render(){
      //Check if loginStatus prop was passed, only components accessed after logging in will pass the required prop. Once the correct prop is passed the logged in NavBar is loaded instead
      if (typeof this.props.loginStatus === "undefined" || this.props.loginStatus === false ){
          return(
              <div id="topLevelNav">
                  <Navbar>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <LinkContainer to="/">
                                  <img id={"NavBarJPPLogo"} src={logo} alt="JPP logo" />
                              </LinkContainer>
                          </Navbar.Brand>
                      </Navbar.Header>
                      <Nav pullRight>
                      <LinkContainer to="/about">
                          <NavItem eventKey={2}>About</NavItem>
                      </LinkContainer>
                          <NavDropdown eventKey={3} title="Users" id={"NavBarDropdown"}>
                              <LinkContainer to="/login">
                                  <MenuItem eventKey={3.1}>Login</MenuItem>
                              </LinkContainer>
                              <LinkContainer to="/register">
                                  <MenuItem eventKey={3.2}>Register</MenuItem>
                              </LinkContainer>
                          </NavDropdown>
                      </Nav>
                  </Navbar>
              </div>
          );
    }else{
          return(
              <div id="topLevelNav">
                  <Navbar>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <LinkContainer to="/dashboard">
                                  <img id={"NavBarJPPLogo"} src={logo} alt="JPP logo" />
                              </LinkContainer>
                          </Navbar.Brand>
                      </Navbar.Header>
                        <Navbar.Text>
                              Signed in as: <Navbar.Link to={"dashboard"}>{this.props.currentLogin.username}</Navbar.Link>
                        </Navbar.Text>
                      <Nav>
                          <LinkContainer to={{ pathname: '/data_form', state: {currentLogin: this.props.currentLogin, loginStatus: this.props.loginStatus } }}>
                              <NavItem eventKey={2}>Data form </NavItem>
                          </LinkContainer>
                      </Nav>
                      <Nav>
                          <LinkContainer to={{ pathname: '/edit_appointments', state: {currentLogin: this.props.currentLogin, loginStatus: this.props.loginStatus } }}>
                              <NavItem eventKey={3}>Edit appointments</NavItem>
                          </LinkContainer>
                      </Nav>
                      <Nav pullRight>
                          <NavDropdown eventKey={4} title={ <img id={"NavBarSettingsGear"} src={settingsGear} alt="Settings Gear" />} id={"NavBarDropdown"}>
                              <LinkContainer to="/profile">
                                  <MenuItem eventKey={4.1}>Profile</MenuItem>
                              </LinkContainer>
                              <LinkContainer to="/">
                                  <MenuItem eventKey={4.2}>Logout</MenuItem>
                              </LinkContainer>
                          </NavDropdown>

                      </Nav>
                  </Navbar>
              </div>
          );
    }
  }
}

/*
<nav className="navbar navbar-toggleable-md">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container">
          <Link className="navbar-brand" to="/">React Website</Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
 */

/*
<Navbar pullRight>
            <LinkContainer to="/">
                <NavItem eventKey={1}>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
                <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
                <NavItem eventKey={3}>Login</NavItem>
            </LinkContainer>
</Navbar>
*/


/*
 <div className="App container">
              <NavBar fluid collapseOnSelect>
                  <NavBar.Header>
                      <NavBar.Brand>
                          <Link to="/">Home</Link>
                      </NavBar.Brand>
                      <Navbar.Toggle />
                  </NavBar.Header>
                  <Navbar.Collapse>
                      <Nav pullRight>
                          <NavItem href="/signup">About</NavItem>
                          <NavItem href="/login">Login</NavItem>
                      </Nav>
                  </Navbar.Collapse>
              </NavBar>

 </div>

  */