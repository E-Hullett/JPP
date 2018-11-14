import React, { Component } from 'react';
import Weather from './Weather';
import{ Container, Navbar, NavbarBrand, Row, Col, Jumbotron, InputGroup, Input, InputGroupAddon, Button, FormGroup } from 'reactstrap';
//<Container> contains other elements in the return statement, <Navbar> is a bar that appears at the top of the window, <InputGroup> groups input tags together (EG <Input> and <Button>),
//<InputGroupAddition> allows one tag to be put directly after the other (EG <Button> is on the same line as <Input>)

class OpenWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: null,
            cityList: [],
            newCityName: ''
        }
    }
    //Event listener
    //Use event varaible passed by the onchange listener, get value from the target attribute
    handleInputChange = (e) => {
        this.setState({ newCityName: e.target.value });
    };
    //Event listener, when onchange listener in the form is triggered this method is called.
    handleChangeCity = (e) => {
        this.getWeather(e.target.value);
    };

    //Event handler, called when the button is pressed, posts to postgres db
    handleAddCity = () => {
        //See if the city exists in the api before adding it
            fetch('/api/cities', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({city: this.state.newCityName})
            })
                .then(res => res.json())
                .then(res => {
                    this.getCityList();
                    this.setState({newCityName: ''});
                });


    };

    //Check if an entered city exists before searching the database for it

    //Fetch (GET) data from api endpoint, reponse is acknowledged json, map through rows to get city names. The api links to the postgres db
    //Called by the handleAddCity event handler
    getCityList = () => {
        fetch('/api/cities')
            .then(res => res.json())
            .then(res => {
                let cityList = res.map(r => r.city_name);
                this.setState({ cityList });
            });
    };

    //Fetch (GET) method. The api links to OpenWeatherMap api
    //Called by the handleChangeCity event listener
    getWeather = (city) => {
        fetch(`/api/weather/${city}`)
            .then(res => res.json())
            .then(weather => {
                this.setState({ weather });
            //console.log(weather.name)
                if(typeof this.state.weather.name === "undefined") console.log(`Request for: ${city} returns invalid (city not found within API)`)
            });
    };

    //Called by react when a component is started (lifecycle method)
    componentDidMount() {
        this.getCityList();
    }


    // { this.state.cityList.length === 0 && <option>No cities added yet.</option> },
    // this is a React feature, If the value before the AND operator returns true, then the JSX tag after it is rendered
    // <Weather data={this.state.weather}/>
    // Calls weather component and passes the weather json (from within the state) to the props object

    render (){
        return (
            <Container fluid className="centered">
                <Navbar dark color="dark">
                    <NavbarBrand href="/">MyWeather</NavbarBrand>
                </Navbar>
                <Row>
                    <Col>
                        <Jumbotron>
                            <h1 className="display-3">MyWeather</h1>
                            <p className="lead">The current weather for your favorite cities!</p>
                            <InputGroup>
                                <Input
                                    placeholder="New city name..."
                                    value={this.state.newCityName}
                                    onChange={this.handleInputChange}
                                />

                                <InputGroupAddon addonType="append">
                                    <Button color="primary" onClick={this.handleAddCity}>Add City</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="display-5">Current Weather</h1>
                        <FormGroup>
                            <Input type="select" onChange={this.handleChangeCity}>
                                { this.state.cityList.length === 0 && <option>No cities added yet.</option> }
                                { this.state.cityList.length > 0 && <option>Select a city.</option> }
                                { this.state.cityList.map((city, i) => <option key={i}>{city}</option>) }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Weather data={this.state.weather}/>
            </Container>
        );
    }



}

export default OpenWeather;


/*
 return (
        <Container fluid className={"centered"}>
            <Navbar dark color="dark">
                <NavbarBrand href="/">MyWeather</NavbarBrand>
            </Navbar>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Container>
    );

 */