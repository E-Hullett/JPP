import React, { Component } from 'react';
import Footer from '../widgets/Footer'
import NavBar from '../widgets/NavBar'
import Jumbotron from '../widgets/Jumbotron'

//TODO Generate unique id's for every customer
//TODO Update Navbar 2 and thsi component, find a way to keep the user logged in after the page refreshes

export default class Home2 extends Component {
    constructor(props){
        super(props);
        //Set the passed state = to the local state
        this.state = this.props.location.state
    }

    render(){
        return(
            <div>
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                <Jumbotron title="Welcome" subtitle= "u are now logged in my boi" />
                <div className="container">
                    <h2>Welcome</h2>
                    <p>
                        This is the login homepage JPP Homepage
                    </p>
                    <p>
                        JPP homepage paragraph
                    </p>
                </div>
                <Footer />
            </div>
        )
    }
}
