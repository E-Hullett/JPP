import React, { Component } from 'react';
import Footer from '../widgets/Footer'
import NavBar from '../widgets/NavBar'
import Jumbotron from '../widgets/Jumbotron'

class Home extends Component {
    render(){
        return(
            <div>
                <NavBar />
                    <Jumbotron title="Welcome" subtitle="Yeeeeeeeeeeeeeeeeee" />
                    <div className="container">
                        <h2>Welcome</h2>
                            <p>
                                This JPP Homepage
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

export default Home;
