import React, { Component } from 'react';
import Footer from '../widgets/Footer'
import NavBar from '../widgets/NavBar'
import Jumbotron from '../widgets/Jumbotron'

import './../../css/global.css'
class Home extends Component {
    render(){
        return(
            <div>
                <NavBar />
                    <Jumbotron title="Welcome to Jo's Pampered Paws" subtitle="Navigate with the above navbar" />
                    <div className="container">
                        <h2>Welcome</h2>
                            <p>
                                This is the website for Jo's Pampered Paws, here you can login and submit information
                                about your dog, to make the grooming process quicker and easier.
                                Also, you can view your appointments and request new appointments.
                            </p>
                    </div>
                <Footer />
            </div>
        )
    }
}

export default Home;
