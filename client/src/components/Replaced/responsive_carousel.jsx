import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import * as JoAndPug from '../../../images/JoAndPug.jpg';
import * as JoAndPug2 from '../../../images/JoAndPug2.jpg';
import * as city_streets from '../../../images/city_streets.jpeg';

export default class JPP_Carousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={JoAndPug} alt={"wat"} />
                </div>
                <div>
                    <img src={JoAndPug2} alt={"wat2"} />
                </div>
                <div>
                    <img src={city_streets} alt={"wat3"} />
                </div>
            </Carousel>
        );
    }
};

