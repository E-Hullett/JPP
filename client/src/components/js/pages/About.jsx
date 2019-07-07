import React, { Component } from 'react';
import Footer from '../widgets/Footer.jsx';
import NavBar from '../widgets/NavBar.jsx';
import Jumbotron from '../widgets/Jumbotron.jsx';


class About extends Component {
    render() {
        return (
            <div>
                <NavBar />
                    <Jumbotron title="About JPP" subtitle="Infomation about Jo's Pampered Paws" />
                        <div className="container">
                            <h2>About</h2>
                            <p>
                                Jo_s_Pampered_Paws is a dog grooming business in the UK, it uses specialised tools and techniques to provide a high quality groom
                                in a small period of time. The atmosphere is welcoming and comfortable with other services avaliable to your dog, such as washing.
                            </p>

                        </div>
                <Footer />
            </div> );
    }
}



export default About;