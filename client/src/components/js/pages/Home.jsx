import React, { Component } from 'react';
import Footer from '../widgets/Footer'
import Navbar from '../widgets/Navbar'
import Jumbotron from '../widgets/Jumbotron'

class Home extends Component {
    render(){
        return(
            <div>
                <Navbar />
                    <Jumbotron title="Welcome" subtitle="Put something witty here!" />
                    <div className="container">
                        <h2>Welcome</h2>
                            <p>
                                This JPP Bitch
                            </p>
                            <p>
                                This is the JPP second paragraph mother fucka
                            </p>
                    </div>
                <Footer />
            </div>
        )
    }
}

export default Home;
